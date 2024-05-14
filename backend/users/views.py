from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.core.mail import send_mail, EmailMessage
from django.conf import settings

# Create your views here.


class Home(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        recipient_email = request.data.get("recipient_email")
        message = request.data.get("message")

        if self.request.method == 'POST':
            # Send email
            EmailMessage(
                "Subject of the email",
                message,
                [recipient_email],

            )

            # Optionally, you can return a response indicating success
            return Response({"message": "Email sent successfully"})
