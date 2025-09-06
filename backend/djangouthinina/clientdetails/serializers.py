from rest_framework import serializers
from .models import ClientAccDetails
from clients.serializers import UserDetailSerializer


class ClientAccDetailsSerializer(serializers.ModelSerializer):
    client = UserDetailSerializer(read_only=True)

    class Meta:
        model = ClientAccDetails
        fields = [
            'id',
            'client',
            'profile_picture'
        ]


class ClientAccDetailsUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientAccDetails
        fields = [
            'profile_picture'
        ]
