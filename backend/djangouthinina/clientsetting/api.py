from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ClientSetting
from .forms import ClientSettingForm
from .serializers import ClientSettingSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def client_settings_list(request):
    """Get list of all client settings"""
    settings = ClientSetting.objects.filter(user=request.user)
    serializer = ClientSettingSerializer(settings, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    })


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def client_settings_detail(request, pk):
    """Get specific client settings"""
    settings = get_object_or_404(ClientSetting, id=pk, user=request.user)
    serializer = ClientSettingSerializer(settings)
    return Response({
        'success': True,
        'data': serializer.data
    })


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_client_settings(request):
    form = ClientSettingForm(request.data,request.FILES)
    
    if form.is_valid():
        story = form.save(commit=False)
        story.user = request.user  # assign logged-in user
        story.save()
        
        return Response({
            'success': True,
            'data': ClientSettingSerializer(story).data
        })
    else:
        print('error', form.errors, form.non_field_errors)
        return Response({
            'success': False,
            'errors': form.errors
        }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_client_settings(request, pk):
    """Update existing client settings"""
    settings = get_object_or_404(ClientSetting, id=pk, user=request.user)
    # Use the serializer with the instance to update
    serializer = ClientSettingSerializer(settings, data=request.data)

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
    settings = get_object_or_404(ClientSetting, id=pk, user=request.user)
    settings.delete()

    return Response({
        'success': True,
        'message': 'Settings deleted successfully'
    })
