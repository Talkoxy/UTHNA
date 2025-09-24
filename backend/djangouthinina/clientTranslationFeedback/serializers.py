from rest_framework import serializers
from .models import ClientFeedback
from clients.serializers import UserDetailSerializer


class ClientFeedbackListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientFeedback
        fields = (
            'id',
            'feedback',
            'context',
            'original_translation',
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
            'original_translation',
            'translated_from',
            'translated_to',
            'feedback',
            'context',
        )



