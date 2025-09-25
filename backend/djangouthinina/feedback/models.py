import uuid
from django.db import models
from clients.models import User

class Feedback(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    client = models.ForeignKey(User, on_delete=models.CASCADE)

    original_tranlation = models.CharField(blank=False)
    corrected_translation = models.CharField(blank=False)
    feedback = models.CharField(blank=False)

    source_language = models.CharField(blank=False)
    target_language = models.CharField(blank=False)

    created_at = models.DateTimeField(auto_now_add=True)

    
    
