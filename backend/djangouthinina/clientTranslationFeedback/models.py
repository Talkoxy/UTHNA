import uuid
from django.db import models
from clients.models import User
from translations.models import ClientTranslation


class ClientFeedback(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='clienttranslation', db_column='user_id')
    created_at = models.DateTimeField(auto_now_add=True)


    original_translation = models.TextField()
    translated_from = models.TextField()
    translated_to = models.TextField()
    feedback = models.TextField()
    context = models.TextField(null=True)

