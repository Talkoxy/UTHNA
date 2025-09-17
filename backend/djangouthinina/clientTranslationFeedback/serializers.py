from rest_framework import serializers
from .models import ClientFeedback
from clients.serializers import UserDetailSerializer 
from translations.serializers import ClientTranslationDetailSerializer


class ClientFeedbackListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = ClientFeedback
        fields = (
            'id',
            'user',
            'feedback',
            'context',
            'original',
            'translated_from',
            'translated_to',
        )


class ClientFeedbackDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = ClientFeedback
        fields = (
            'id',
            'user',
            'created_at',
            'original_translation',
            'translated_from',
            'translated_to',
            'feedback',
            'context',
        )

