from django.forms import ModelForm
from .models import ClientFeedback

class ClientFeedbackForm(ModelForm):
    class Meta:
        model = ClientFeedback
        fields = (
            'feedback',
            'context',
            'original_translation',
            'translated_from',
            'translated_to',
        )