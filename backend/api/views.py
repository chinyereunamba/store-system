from rest_framework.viewsets import ModelViewSet, ViewSet
from base.models import *
from .serializers import *
from rest_framework.permissions import AllowAny


class ProductAPIView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes  = [AllowAny]


class PurchaseItemAPIView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer


class PurchaseRecordAPIView(ModelViewSet):
    queryset = PurchaseRecord.objects.all()
    serializer_class = PurchaseRecordSerializer


class SalesItemAPIView(ModelViewSet):
    queryset = SalesItem.objects.all()
    serializer_class = SalesItemSerializer


class BrandAPIView(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class CategoryAPIView(ModelViewSet):
    queryset = Category.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer


class SupplierAPIView(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
