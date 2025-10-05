from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from .models import User
from django.contrib.auth import get_user_model

from dj_rest_auth.registration.serializers import RegisterSerializer 

class UserSerializer(serializers.ModelSerializer):
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
        fields = ['id', 'username','email' ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
        
   
class CustomRegistrationSerializer(RegisterSerializer):
    # Add password2 for confirmation check
    password2 = serializers.CharField(
        style={'input_type': 'password'},
        write_only=True
    )
    
    # 📝 RegisterSerializer already includes 'username' and 'email' fields.
    # We only need to override the methods to enforce your specific validation.

    def validate_email(self, email):
        # Re-use your existing email validation logic
        email = get_adapter().clean_email(email)
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "A user is already registered with this e-mail address. backend"
            )
        return email

    def validate(self, data):
        # Use the base class validation which includes password hashing and checks
        data = super().validate(data) 
        
        # Add your custom password matching validation
        if data['password'] != data.get('password2'):
            raise serializers.ValidationError("The two password fields didn't match.")
            
        return data

    


User = get_user_model()

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