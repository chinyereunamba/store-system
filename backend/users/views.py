from django.shortcuts import render
from rest_framework.generics import ListAPIView

from .serializers import UserSerializer
from .models import Account

# Create your views here.

class UserList(ListAPIView):
    serializer_class = UserSerializer
    queryset = Account.objects.all()
    