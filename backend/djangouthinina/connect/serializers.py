from rest_framework import serializers
from .models import  ConnectPost, ConnectComment
from clients.serializers import UserSerializer


class ConnectPostSerializer(serializers.ModelSerializer):
    image_url = serializers.ReadOnlyField()
    class Meta:
        model = ConnectPost
        fields = [
            'id',
            'title',
            'text',
            'image_url',
        ]


class ConnectCommentSerializer(serializers.ModelSerializer):
    post = ConnectPostSerializer (read_only = True, many = False)
    class Meta:
        model = ConnectComment
        fields = [
            'id',
            'post',
            'comment',
        ]


class ConnectPostDetailSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only = True, many = False)
    class Meta:
        model = ConnectPost
        fields = [
            'id',
            'author'
            'title',
            'text',
            'image_url',
        ]


class ConnectCommentDetailSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only = True , many = False)
    class Meta:
        model = ConnectComment
        fields = [
            'id',
            'post',
            'created_by',
            'comment',
        ]