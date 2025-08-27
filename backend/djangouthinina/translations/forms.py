from django.forms import ModelForm
from .models import ClientTranslation

class ClientTranslationForm(ModelForm):
    class Meta:
        model = ClientTranslation
        fields = (
            'original_text',
            'translated_text',
            'source_language',
            'target_language',
            'is_saved',
            'is_liked',
        )