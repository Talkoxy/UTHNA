from django.forms import ModelForm
from .models import Settings

class SettingsForm(ModelForm):
    class Meta:
        model = Settings
        fields = [
            'user_preferred_source_language',
            'user_preferred_target_language',
            'user_avatar',
            'subscription_status',
            'profile_visibility',
        ]

        