from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ClientFeedback
from .forms import ClientFeedbackForm
from .serializers import ClientFeedbackListSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_client_feedback(request):
    """Create new client translation feedback"""
    form = ClientFeedbackForm(request.POST)

    if form.is_valid():
        feedback = form.save(commit=False)
        feedback.user = request.user
        feedback.save()
        return Response({
            'success': True,
        })
    
    return Response({
        'success': False,
        'errors': form.errors
    }, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def client_feedback_list(request):
    """ Get list of all client Feedback"""
    feedbacks = ClientFeedback.objects.filter(user=request.user)
    serializer = ClientFeedbackListSerializer(feedbacks, many=True)
    return Response({
        'success': True,
        'data': serializer.data
    })

