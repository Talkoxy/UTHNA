from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView

from .serializers import userLoginSerializer, userRegistrationSerializer


class CustomLoginView(LoginView):
    serializer_class = userLoginSerializer

class CustomRegisterView(RegisterView):
    serializer_class = userRegistrationSerializer