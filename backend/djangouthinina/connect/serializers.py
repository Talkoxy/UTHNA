from rest_framework import serializers
from .models import ConnectPost, ConnectComment,Comment
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
    connect = serializers.PrimaryKeyRelatedField(
        queryset=ConnectPost.objects.all(), # Ensures the ID is valid
        required=True # Makes the post ID mandatory for creation
    )
    class Meta:
        model = Comment
        fields = [
            'id',
            'text',
            'connect',
        ]


class ConnectPostDetailSerializer(serializers.ModelSerializer):
    # 1. Embed the enhanced UserSerializer
    # This ensures 'author' object contains 'id', 'username', and 'author_picture_url'
    author = UserSerializer(read_only=True, many=False)
    
    class Meta:
        model = ConnectPost
        fields = [
            'id',
            'author', 
            'title',
            'text',
            'created_at',
        ]

    # 3. Implement the method to get the post's main image URL
    def get_image_url(self, obj):
        """
        Returns the full URL for the post's main image by calling the model's image_url method.
        """
        if obj.image:
            return obj.image_url()
        return None # Return None if no image is uploaded


class CommentDetailSerializer(serializers.ModelSerializer):
    # This also embeds the enhanced UserSerializer, so comment author details are included
    author = UserSerializer(read_only=True, many=False)
    connect = ConnectPostSerializer(read_only=True, many=False)
    class Meta:
        model = ConnectComment
        fields = [
            'id',
            'connect',
            'author',
            'text',
            'created_at',
           
        ]
