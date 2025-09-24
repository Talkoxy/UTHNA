from rest_framework import serializers
from .models import ClientSetting
from clients.serializers import UserSerializer

class ClientSettingSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = ClientSetting
        fields = [
            'id',
            'user',
            'user_preferred_source_language',
            'user_preferred_target_language', 
            'image_url',
            'subscription_status', 
            'profile_visibility',
        ]

        