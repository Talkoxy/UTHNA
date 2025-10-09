from .models import Avatar
from .serializers import AvatarGetSerializer, AvatarSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_avatar(request):
    serializer = AvatarSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(client=request.user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
@authentication_classes([])  
@permission_classes([])      
def avatar(request):
    avatar = Avatar.objects.all()
    

    user_id = request.GET.get('user_id', '')
    if user_id:
        avatar = avatar.filter(client_id=user_id)

    serializer = AvatarGetSerializer(avatar, many=True)

    return Response({
        'data': serializer.data
    })