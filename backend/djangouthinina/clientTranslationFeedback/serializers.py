from rest_framework import serializers
from .models import ClientFeedback
from clients.serializers import UserDetailSerializer 
from translations.serializers import ClientTranslationDetailSerializer


class ClientFeedbackListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, many=False)
    translation = ClientTranslationDetailSerializer(read_only=True, many=False)
    class Meta:
        model = ClientFeedback
    
        fields = (
            'id',
            'user',
            'translation',
            'feedback',
            'context',
        )


class ClientFeedbackDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = ClientFeedback
    
        fields = (
            'id',
            'user',
            'translation',
            'feedback',
            'context',
            'created_at',
        )

