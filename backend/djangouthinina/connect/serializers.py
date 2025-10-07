from rest_framework import serializers
from .models import ConnectPost, ConnectComment
# Assuming the imported UserSerializer now includes 'username' and 'author_picture_url'
from clients.serializers import UserSerializer 


class ConnectPostSerializer(serializers.ModelSerializer):
    # This serializer is likely used for listing or creation/update where full detail isn't needed
    class Meta:
        model = ConnectPost
        fields = [
            'id',
            'title',
            'text',
            'image',
        ]


class ConnectCommentSerializer(serializers.ModelSerializer):
    post = ConnectPostSerializer(read_only=True, many=False)
    class Meta:
        model = ConnectComment
        fields = [
            'id',
            'post',
            'text',
        ]


class ConnectPostDetailSerializer(serializers.ModelSerializer):
    # 1. Embed the enhanced UserSerializer
    # This ensures 'author' object contains 'id', 'username', and 'author_picture_url'
    author = UserSerializer(read_only=True, many=False)
    
    # 2. Define the image_url field
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = ConnectPost
        fields = [
            'id',
            'author', # <-- Now includes the picture URL
            'title',
            'text', # <-- FIX: Added comma here
            'image_url',
        ]

    # 3. Implement the method to get the post's main image URL
    def get_image_url(self, obj):
        """
        Returns the full URL for the post's main image by calling the model's image_url method.
        """
        if obj.image:
            return obj.image_url()
        return None # Return None if no image is uploaded


class ConnectCommentDetailSerializer(serializers.ModelSerializer):
    # This also embeds the enhanced UserSerializer, so comment author details are included
    created_by = UserSerializer(read_only=True, many=False)
    class Meta:
        model = ConnectComment
        fields = [
            'id',
            'post',
            'created_by', # <-- Now includes the picture URL
            'text',
        ]
