from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from .models import Account


class UserDetailsSerializer(UserDetailsSerializer):
    username = serializers.CharField()
    class Meta(UserDetailsSerializer.Meta):
        model = Account
        fields = [
            "pk",
            'email',
            "username",
            "is_superuser"
        ]
