from .forms import SettingsForm
from .models import Settings
from .serializers import SettingsSerializer, SettingsDetailSerializer
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.http import JsonResponse

@api_view(['POST','FILES'])
def create_settings(request):
    form = SettingsForm(request.data ,request.FILES)
    if form.is_valid():
        settings = form.save(commit=False)
        settings.client = request.user
        settings.save()
        
        return JsonResponse({'success': True})
    else:
        print('error', form.errors, form.non_field_errors)
        return JsonResponse({'errors': form.errors.as_json()}, status=400)