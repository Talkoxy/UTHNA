import uuid
from django.db import models
from clients.models import User
from django.conf import settings

class ClientSetting(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clientsetting', db_column='user_id')

    """ language settings """
    user_preferred_source_language = models.CharField(max_length=10, default='en')
    user_preferred_target_language = models.CharField(max_length=10, default='zu')

    """ Profile settings """
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    subscription_status = models.CharField(max_length=20, default='free')  
    profile_visibility = models.CharField(max_length=10, default='private') 


    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.profile_picture.url}'
            