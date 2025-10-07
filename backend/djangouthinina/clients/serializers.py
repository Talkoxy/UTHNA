from rest_framework import serializers
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model


# Import the Settings model to access its data
# Assuming the Settings model is in the 'settings_app' application
try:
    from settings.models import Settings
except ImportError:
    
    pass 

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    # hide password
        extra_kwargs = {
            'password': {'write_only':True}
        }

class UserDetailSerializer(serializers.ModelSerializer):
    # Define a new field to hold the avatar URL
    author_picture_url = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        # Include the new field in the serialized output
        fields = ['id', 'username','email', 'author_picture_url']
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
    # Method to retrieve the avatar URL from the related Settings model
    def get_author_picture_url(self, obj):
        """
        Traverses the 'settings' relationship (using related_name='settings')
        to find the avatar URL on the related Settings model.
        """
        try:
            # Since the relationship is ForeignKey, we use .first() to get the primary settings object.
            settings_obj = obj.settings.first() 
            
            if settings_obj and settings_obj.user_avatar:
                # Call the image_url method defined on the Settings model
                return settings_obj.image_url()
            
            # Return None or a default image URL if no avatar is set
            return None 
        except AttributeError:
            # Handle cases where the Settings model or relationship hasn't been created yet
            return None
        
        
   
class UserRegistrationSerializer(serializers.Serializer):
    username = None
    username = serializers.CharField(required = True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, style={"input_type": "password"})
    password2 = serializers.CharField(write_only=True, style={"input_type": "password2"})
    
    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if email and User.objects.filter(email=email).exists():
            raise serializers.ValidationError(
                "A user is already registered with this e-mail address. backend"
            )
        return email
    
    def validate_password1(self, password):
        return get_adapter().clean_password(password)

    def validate(self, data):
        if data["password"] != data["password2"]:
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
