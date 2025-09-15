from django.forms import ModelForm
from .models import ClientSettings

class ClientSettingsForm(ModelForm):

    """Form for ClientSettings model"""

    class Meta:
        model = ClientSettings
        fields = [
            'user_preferred_source_language',
            'user_preferred_target_language', 
            'profile_picture', 
            'profile_visibility',
            ]
        

