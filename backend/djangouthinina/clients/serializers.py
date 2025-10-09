from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate 

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    # DRF automatically detects the 'image_url' method on the User model
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    # hide password
        extra_kwargs = {
            'password': {'write_only':True}
        }

class UserDetailSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = User
        
        fields = ['id', 'username','email',]
        extra_kwargs = {
            'password': {'write_only': True}
        }

   
class UserRegistrationSerializer(serializers.Serializer):
   
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
   
    password1 = serializers.CharField(write_only=True, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, style={"input_type": "password"})
    
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "A user is already registered with this e-mail address. backend"
            )
        return email
    
    def validate_password1(self, password):
        # NOTE: This method name is correct for field-level validation of 'password1'
        return get_adapter().clean_password(password)

    def validate(self, data):
        # Checks if the two password fields match
        if data["password1"] != data["password2"]:
            raise serializers.ValidationError("The two password fields didn't match.")
        return data
    
    def get_cleaned_data(self):
        return {
            # FIX 1 & 2: Changed "name" to "username"
            "username": self.validated_data.get("username", ""),
            "password": self.validated_data.get("password1", ""), 
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
    


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            raise serializers.ValidationError("Both email and password are required")
        
        user = User.objects.filter(email=email).first()
        
        if user and user.check_password(password):
            return {'user': user}
        raise serializers.ValidationError("Invalid credentials")
    
class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        
        fields = ['id', 'user_avatar',]


class UserImageDetailSerializer(serializers.ModelSerializer):

    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        
        fields = ['id', 'image_url',]
        

    def get_image_url(self, obj):
        """
        Returns the full URL for the post's main image by calling the model's image_url method.
        """
        if obj.user_avatar:
            return obj.image_url()
        return None # Return None if no image is uploaded