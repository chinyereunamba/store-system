from django.core.mail import send_mail
from dj_rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from .models import Account
from django.conf import settings


class UserDetailsSerializer(UserDetailsSerializer):
    username = serializers.CharField()

    class Meta(UserDetailsSerializer.Meta):
        model = Account
        fields = ["pk", "email", "username", "is_superuser"]


class CustomRegisterSerializer(RegisterSerializer):
    def save(self, request):
        user = super().save(request)

        # Send registration email
        send_mail(
            "Welcome to our platform",
            f"Hello {user.username}, Thank you for registering on our platform.",
            settings.EMAIL_HOST_USER,
            [user.email],
            fail_silently=False,
        )

        return user
