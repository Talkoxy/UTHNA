from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView
from .serializers import UserLoginSerializer, UserRegistrationSerializer

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client

class CustomLoginView(LoginView):
    serializer_class = UserLoginSerializer

class CustomRegisterView(RegisterView):
    serializer_class = UserRegistrationSerializer

