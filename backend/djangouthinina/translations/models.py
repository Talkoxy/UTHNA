import uuid
from django.db import models
from clients.models import User


class ClientTranslation(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='translations', db_column='user_id')
    created_at = models.DateTimeField(auto_now_add=True)

    original_text = models.TextField()
    translated_text = models.TextField()
    source_language = models.CharField(max_length=10)
    target_language = models.CharField(max_length=10)

