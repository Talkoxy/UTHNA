import uuid

from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager, Group, Permission


class CustomUserManager(UserManager):
    def _create_user (self,username,email,password,**extra_fields):
        if not email:
            raise ValueError("You have not entered an email address")
        
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using = self.db)

        return user
    
    def create_user(self, username = None, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)

        return self._create_user(username, email, password, **extra_fields)
    
    def create_superuser(self, username = None, email = None, password = None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(username, email, password, **extra_fields)

class User (AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True ,blank=False)
    username = models.CharField(max_length=255,blank=False)
    
    # ------------------ PRODUCTION FIXES ----------------------
    # 1. Must use blank=True, null=True to allow empty values in database/forms
    # 2. Set a default file path (must be an actual image file in your media storage)
    user_avatar = models.ImageField(
        upload_to='avatars/', 
        blank=True, 
        null=True, 
        default='avatars/default_profile.png' # IMPORTANT: Create this file in your MEDIA_ROOT/avatars/
    )
    # ----------------------------------------------------------

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    groups = models.ManyToManyField(
        Group,
        related_name="custom_user_groups",  # Avoids conflict with auth.User
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name="custom_user_permissions",  # Avoids conflict with auth.User
        blank=True
    )
    
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def image_url(self):
        """
        Returns the absolute URL for the user's avatar.
        This handles both uploaded files (via user_avatar.url) and the default static path.
        """
        # If user_avatar is not set (i.e., it's null in DB, or uses the default path)
        if not self.user_avatar or self.user_avatar.name == self.user_avatar.field.default:
            # Fallback to a static file URL (e.g., /static/images/default_avatar.png)
            # You must ensure this file exists in your static files directory.
            return f'{settings.STATIC_URL}images/default_avatar.png'
            
        # If an actual file is uploaded, use its URL (handled by storage backend like S3/Digital Ocean Spaces)
        return f'{settings.WEBSITE_URL}{self.user_avatar.url}'
