import uuid
from django.db import models
from clients.models import User


class ClientAccDetails(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='account_details', db_column='user_id')

    profile_picture = models.ImageField(
        upload_to='profile_pictures/', null=True, blank=True)
