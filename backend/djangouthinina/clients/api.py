from django.shortcuts import get_object_or_404
from .serializers import UserDetailSerializer, UserRegistrationSerializer
from .models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication


# ----------------------------------------------------------------------
# GET: Retrieve User Details
# ----------------------------------------------------------------------
@api_view(['GET'])
@authentication_classes([])
@permission_classes([])
def user_detail(request, pk):
    """
    Retrieves a single user's public details (including avatar URL).
    Uses get_object_or_404 for robust error handling.
    """
    # Use get_object_or_404 for cleaner handling of missing users
    user = get_object_or_404(User, pk=pk)
    # Use standard DRF Response instead of JsonResponse
    serializer = UserDetailSerializer(user)
    return Response(serializer.data, status=status.HTTP_200_OK)


# ----------------------------------------------------------------------
# PUT/PATCH: Update User Details
# ----------------------------------------------------------------------
@api_view(['PUT', 'PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_user(request, pk):
    """
    Updates an authenticated user's profile data.
    Requires token authentication and self-authorization (pk must match request.user.pk).
    """
    try:
        # Authorization check: Ensure user can only update their own profile
        if str(request.user.pk) != str(pk):
            return Response(
                {"error": "You don't have permission to update this profile."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        user = get_object_or_404(User, pk=pk)
        
        # Use partial=True to allow PATCH requests (updating only specified fields)
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
    
    except Exception:
        # Catch internal server errors gracefully
        return Response(
            {"error": "An internal server error occurred during update."}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# ----------------------------------------------------------------------
# DELETE: Delete User Account
# ----------------------------------------------------------------------
@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def delete_user(request, pk):
    """
    Deletes the authenticated user's account.
    Requires token authentication and self-authorization.
    """
    # Authorization check: Ensure user can only delete their own profile
    if str(request.user.pk) != str(pk):
        return Response(
            {"error": "You don't have permission to delete this profile."}, 
            status=status.HTTP_403_FORBIDDEN
        )
        
    user = get_object_or_404(User, pk=pk)
    user.delete()
    # HTTP 204 No Content is the standard response for a successful deletion
    return Response(status=status.HTTP_204_NO_CONTENT)


# ----------------------------------------------------------------------
# POST: User Registration
# ----------------------------------------------------------------------
@api_view(['POST'])
def register_view(request):
    """
    Registers a new user account.
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(request=request) # Pass request object for allauth adapter
        return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
