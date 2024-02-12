from rest_framework.viewsets import ModelViewSet, ViewSet
from base.models import *
from .serializers import *


class ProductAPIView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class PurchaseItemAPIView(ModelViewSet):
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer


class PurchaseOrderAPIView(ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer


class PurchaseRecordAPIView(ModelViewSet):
    queryset = PurchaseRecord.objects.all()
    serializer_class = PurchaseRecordSerializer


class SalesItemAPIView(ModelViewSet):
    queryset = SalesItem.objects.all()
    serializer_class = SalesItemSerializer


class SalesTransactionAPIView(ModelViewSet):
    queryset = SalesTransaction.objects.all()
    serializer_class = SalesTransactionSerializer


class BrandAPIView(ModelViewSet):
    queryset = Brand.objects.all()
    serializer_class = BrandSerializer


class CategoryAPIView(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class SupplierAPIView(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer
