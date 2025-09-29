from rest_framework import serializers
from .models import Settings
from clients.serializers import UserSerializer

class SettingsSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    class Meta:
        model = Settings
        fields= [
            'id',
            'user_preferred_source_language',
            'user_preferred_target_language',
            'image_url',
            'subscription_status',
            'profile_visibility',
        ]

class SettingsDetailSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    class Meta:
        model = Settings
        fields= [
            'id',
            'client',
            'user_preferred_source_language',
            'user_preferred_target_language',
            'image_url',
            'subscription_status',
            'profile_visibility',
        ]