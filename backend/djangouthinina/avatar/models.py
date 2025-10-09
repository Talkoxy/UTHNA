import uuid

from django.db import models
from clients.models import User
from django.conf import settings


class Avatar(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, related_name='avatar', on_delete=models.CASCADE,)
    image = models.ImageField(upload_to='clientAvatar/', blank=True, null=True)

    def image_url(self):
        return f'{settings.WEBSITE_URL}{self.image.url}'
