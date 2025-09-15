from rest_framework import serializers
from .models import ClientSettings
from clients.serializers import UserSerializer

class ClientSettingsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = ClientSettings
        fields = [
            'id',
            'user',
            'user_preferred_source_language',
            'user_preferred_target_language', 
            'profile_picture',
            'subscription_status', 
            'profile_visibility',
        ]