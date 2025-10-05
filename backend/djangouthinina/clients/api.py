from django.shortcuts import get_object_or_404
from .serializers import UserDetailSerializer, CustomRegistrationSerializer
from .models import User
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication



@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def user_detail(request, pk):
    user = User.objects.get ( pk = pk)
    
    serializer = CustomRegistrationSerializer(user, many= False)
    
    return JsonResponse(serializer.data, safe = False)



@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    try:
        # Get authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return Response(
                {"error": "Invalid or missing authentication token"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

        # Ensure user can only update their own profile
        if str(request.user.pk) != str(pk):
            return Response(
                {"error": "You don't have permission to update this profile"}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        user = get_object_or_404(User, pk=pk)
        serializer = UserDetailSerializer(user, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()  
            return Response({
                'success': True, 
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        return Response({
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"Update error: {str(e)}")
        return Response(
            {"error": "An error occurred during update"}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['DELETE'])
def delete_user(request, pk):
    user = get_object_or_404(User, pk=pk)
    user.delete()
    return Response({"message": "User deleted"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@authentication_classes([])
@permission_classes([])
def register_view(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({"message": "User registered successfully!, backendcr"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)