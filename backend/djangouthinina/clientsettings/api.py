from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ClientSettings
from .forms import ClientSettingsForm
from .serializers import ClientSettingsSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def client_settings_list(request):
    """Get list of all client settings"""
    settings = ClientSettings.objects.filter(user=request.user)
    serializer = ClientSettingsSerializer(settings, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def client_settings_detail(request, pk):
    """Get specific client settings"""
    settings = get_object_or_404(ClientSettings, id=pk, user=request.user)
    serializer = ClientSettingsSerializer(settings)
    return Response({
        'success': True,
        'data': serializer.data
    })


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_client_settings(request):
    """Create new client settings"""
    # Use the serializer to validate and create data
    serializer = ClientSettingsSerializer(data=request.data)

    if serializer.is_valid():
        # Assign the user before saving
        serializer.save(user=request.user)
        return Response({
            'success': True,
            'data': serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_client_settings(request, pk):
    """Update existing client settings"""
    settings = get_object_or_404(ClientSettings, id=pk, user=request.user)
    # Use the serializer with the instance to update
    serializer = ClientSettingsSerializer(settings, data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response({
            'success': True,
            'data': serializer.data
        })

    return Response({
        'success': False,
        'errors': serializer.errors
    }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([])
def delete_client_settings(request, pk):
    """Delete client settings"""
    settings = get_object_or_404(ClientSettings, id=pk, user=request.user)
    settings.delete()

    return Response({
        'success': True,
        'message': 'Settings deleted successfully'
    })
