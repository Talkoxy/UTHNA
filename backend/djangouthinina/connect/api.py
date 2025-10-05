from .forms import ConnectPostForm , ConnectCommentForm
from .models import ConnectPost, ConnectComment
from .serializers import ConnectPostSerializer, ConnectPostDetailSerializer, ConnectCommentSerializer, ConnectCommentDetailSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_ConnectPost(request):
    serializer = ConnectPostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(author=request.user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
@api_view(['POST'])
@permission_classes([IsAuthenticated]) 
def create_ConnectComment(request):
    serializer = ConnectCommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(created_by=request.user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET'])
@authentication_classes([])  
@permission_classes([])      
def list_ConnectPosts(request):
    connectposts = ConnectPost.objects.all()

    serializer = ConnectPostSerializer(connectposts, many=True, context={'request': request})

    return Response({
        'data': serializer.data
    })