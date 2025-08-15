from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from .models import user
from rest_framework import serializers
from django.contrib.auth import get_user_model

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id', 'username', 'email', 'password']

    # hide password
        extra_kwargs = {
            'password': {'write_only':True}
        }

class userDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields = ['id', 'username','email' ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
        
   
class userRegistrationSerializer(serializers.Serializer):
    username = None
    username = serializers.CharField(required = True)
    email = serializers.EmailField(required=True)
    password1 = serializers.CharField(write_only=True, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"})
    
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and user.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "A user is already registered with this e-mail address. Uthini Na? backend"
            )
        return email
    
    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("The two password fields didn't match.")
        return data
    
    def get_cleaned_data(self):
        return {
            "username": self.validated_data.get("username", ""),
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
        }
        
    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user.username = self.cleaned_data.get("username") 
        adapter.save_user(request, user, self)
        setup_user_email(request, user, [])
        return user
    


user = get_user_model()

class userLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise serializers.ValidationError("Both email and password are required")
        
        user = user.objects.filter(email=email).first()
        
        if user and user.check_password(password):
            return {'user': user}
        raise serializers.ValidationError("Invalid credentials")