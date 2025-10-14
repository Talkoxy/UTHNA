from rest_framework import serializers
from .models import Avatar
# Assuming the imported UserSerializer now includes 'username' and 'author_picture_url'
from clients.serializers import UserSerializer 



class AvatarGetSerializer(serializers.ModelSerializer):
    # CRITICAL CHANGE: Use SerializerMethodField for image_url
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Avatar
        fields = [
            'id',
            'image_url', # This field now calls get_image_url
        ]
        
    def get_image_url(self, obj):
        """
        Returns the full public URL for the image using the request context.
        """
        # 1. Get the request object from the context
        request = self.context.get('request') 
        
        if obj.image and request:
            # 2. Use request.build_absolute_uri() to prepend the public IP/domain
            # obj.image.url should be something like /media/clientAvatar/IMG_1239.PNG
            return request.build_absolute_uri(obj.image.url) 
            
        # Fallback if request context is missing or no image
        return obj.image.url if obj.image else None

class AvatarSerializer(serializers.ModelSerializer):
    # This serializer is likely used for listing or creation/update where full detail isn't needed
    class Meta:
        model = Avatar
        fields = [
            'id',
            'image',
        ]


class AvatarDetailSerializer(serializers.ModelSerializer):
    # 1. Embed the enhanced UserSerializer
    # This ensures 'author' object contains 'id', 'username', and 'author_picture_url'
    client = UserSerializer(read_only=True, many=False)
    
    # 2. Define the image_url field
    image= serializers.SerializerMethodField()
    
    class Meta:
        model = Avatar
        fields = [
            'id',
            'client', # <-- Now includes the picture UR
            'image',
        ]

    # 3. Implement the method to get the post's main image URL
    def get_image_url(self, obj):
        """
        Returns the full URL for the post's main image by calling the model's image_url method.
        """
        if obj.image:
            return obj.image_url()
        return None # Return None if no image is uploaded
