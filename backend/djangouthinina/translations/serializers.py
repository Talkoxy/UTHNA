from rest_framework import serializers
from clients.serializers import UserDetailSerializer  
from .models import ClientTranslation


class ClientTranslationListSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = ClientTranslation
    
        fields = (
            'id',
            'user',
            'original_text',
            'translated_text',
            'target_language',
        )


class ClientTranslationDetailSerializer(serializers.ModelSerializer):
    user = UserDetailSerializer(read_only=True, many=False)
    class Meta:
        model = ClientTranslation
    
        fields = (
            'id',
            'user',
            'original_text',
            'translated_text',
            'source_language',
            'target_language',
            'created_at',
        )
