from django.forms import ModelForm
from .models import Settings

class SettingsForm(ModelForm):
    class Meta:
        model = Settings
        fields = [
            'user_preferred_source_language',
            'user_preferred_target_language',
            'subscription_status',
            'profile_visibility',
        ]

        