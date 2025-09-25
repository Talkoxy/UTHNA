from .forms import FeedbackForm
from .models import Feedback
from .serializers import FeedbackSerializer, FeedbackDetailSerializer

from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_feedback(request):
    form = FeedbackForm(request.data)
    if form.is_valid():
        feedback = form.save(commit=False)
        feedback.client = request.user
        feedback.save()
        serializer = FeedbackSerializer(feedback)

        return Response(serializer.data, status=201)
    else:
        return Response(form.errors, status=400)