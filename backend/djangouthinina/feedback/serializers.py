from rest_framework import serializers
from .models import Feedback
from clients.serializers import UserSerializer

class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields= {
            'id',
            'original_tranlation',
            'corrected_translation',
            'feedback',
            'source_language',
            'target_language',
        }

class FeedbackDetailSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    class Meta:
        model = Feedback
        fields= {
            'id',
            'client',
            'original_tranlation',
            'corrected_translation',
            'feedback',
            'source_language',
            'target_language',
        }