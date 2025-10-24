from .forms import ConnectPostForm , ConnectCommentForm
from .models import ConnectPost, ConnectComment,Comment
from .serializers import ConnectPostSerializer, ConnectPostDetailSerializer, ConnectCommentSerializer, CommentDetailSerializer
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
def create_Comment(request):
    serializer = ConnectCommentSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(author=request.user)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([])  
@permission_classes([])     
def Comments_list(request):
    ConnectComments = Comment.objects.all()

    user_id = request.GET.get('user_id', '')
    if user_id:
        ConnectComments = ConnectComments.filter(user_id=user_id)

    serializer = CommentDetailSerializer(ConnectComments, many=True)

    return Response({
        'data': serializer.data
    })

@api_view(['GET'])
@authentication_classes([])  
@permission_classes([])      
def list_ConnectPosts(request):
    connectposts = ConnectPost.objects.all().order_by('-created_at')

    serializer = ConnectPostDetailSerializer(connectposts, many=True, context={'request': request})

    return Response({
        'data': serializer.data
    })