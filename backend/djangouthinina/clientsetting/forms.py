from django.forms import ModelForm
from .models import ClientSetting

class ClientSettingForm(ModelForm):

    """Form for ClientSettings model"""

    class Meta:
        model = ClientSetting
        fields = [
            'user_preferred_source_language',
            'user_preferred_target_language', 
            'profile_picture', 
            'profile_visibility',
            ]
        

