from django.forms import ModelForm
from .models import Feedback

class FeedbackForm(ModelForm):
    class Meta:
        model = Feedback
        fields = {
            'original_tranlation', 
            'corrected_translation', 
            'feedback', 
            'source_language', 
            'target_language',
        }
        