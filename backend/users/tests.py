from django.test import TestCase

# Create your tests here.
from django.contrib.auth import get_user_model


class UserModelTestCase(TestCase):
    def setUp(self):
        self.User = get_user_model()

    def test_create_user(self):
        # Create a regular user
        user = self.User.objects.create_user(
            email="user@example.com", username="user", password="password123"
        )
        self.assertEqual(user.email, "user@example.com")
        self.assertEqual(user.username, "user")
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        # Create a superuser
        superuser = self.User.objects.create_superuser(
            email="admin@example.com", username="admin", password="admin123"
        )

        self.assertEqual(superuser.email, "admin@example.com")
        self.assertEqual(superuser.username, "admin")
        self.assertTrue(superuser.is_active)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)

    def test_create_user_missing_email(self):
        # Test creating a user without an email
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="", username="user", password="password123"
            )

    def test_create_user_missing_username(self):
        # Test creating a user without a username
        with self.assertRaises(ValueError):
            self.User.objects.create_user(
                email="user@example.com", username="", password="password123"
            )

    def test_create_superuser_missing_email(self):
        # Test creating a superuser without an email
        with self.assertRaises(ValueError):
            self.User.objects.create_superuser(
                email="", username="admin", password="admin123"
            )

    def test_create_superuser_missing_username(self):
        # Test creating a superuser without a username
        with self.assertRaises(ValueError):
            self.User.objects.create_superuser(
                email="admin@example.com", username="", password="admin123"
            )
