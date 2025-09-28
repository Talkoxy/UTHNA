from django.db import models


import uuid
from django.db import models
from clients.models import User
from django.conf import settings

class Settings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='settings', db_column='user_id')

    user_preferred_source_language = models.CharField(blank=False)
    user_preferred_target_language= models.CharField(blank=False)
    user_avatar = models.ImageField(blank=False)

    subscription_status = models.CharField(blank=False, default='free')
    profile_visibility = models.CharField(blank=False)

    created_at = models.DateTimeField(auto_now_add=True)

    

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.user_avatar.url}'
    
