from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from .serializers import UserLoginSerializer, CustomRegistrationSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

@method_decorator(csrf_exempt, name='dispatch')
class CustomLoginView(LoginView):
    serializer_class = UserLoginSerializer

class CustomRegisterView(RegisterView):
    serializer_class = CustomRegistrationSerializer
    
@method_decorator(csrf_exempt, name='dispatch') # <--- ADDED
class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = "http://localhost:8000/accounts/google/login/callback/"
    client_class = OAuth2Client