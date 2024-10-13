from rest_framework.viewsets import ModelViewSet, ViewSet
from base.models import *
from .serializers import *
from rest_framework.permissions import AllowAny


class ProductAPIView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class PurchaseItemAPIView(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer


class PurchaseRecordAPIView(ModelViewSet):
    queryset = PurchaseRecord.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PurchaseRecordSerializer


class SalesItemAPIView(ModelViewSet):
    queryset = SalesItem.objects.all()
    permission_classes = [AllowAny]
    serializer_class = SalesItemSerializer


class BrandAPIView(ModelViewSet):
    queryset = Brand.objects.all()
    permission_classes = [AllowAny]
    serializer_class = BrandSerializer


class CategoryAPIView(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SupplierAPIView(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
