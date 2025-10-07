from django.db import models


import uuid
from django.db import models
# Note: You need to ensure the import path `clients.models` is correct
from clients.models import User
from django.conf import settings

class Settings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    # The related_name='settings' here is what allows User.settings.first()
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='settings', db_column='user_id')

    # Note: CharField requires max_length, but respecting your request not to change existing fields
    user_preferred_source_language = models.CharField(blank=False) 
    user_preferred_target_language= models.CharField(blank=False)
    user_avatar = models.ImageField(blank=False)

    subscription_status = models.CharField(blank=False, default='free')
    profile_visibility = models.CharField(blank=False)

    created_at = models.DateTimeField(auto_now_add=True)

    

    def image_url(self):
        # This method is what the User model's property calls
        return f'{settings.WEBSITE_URL}{self.user_avatar.url}'
    
    def __str__(self):
        return f"Settings for {self.client.username}"
