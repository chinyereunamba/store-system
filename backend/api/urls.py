from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r"brands", BrandAPIView, basename="brands")
router.register(r"category", CategoryAPIView, basename="category")
router.register(r"products", ProductAPIView, basename="products")
router.register(r"purchase-items", PurchaseItemAPIView, basename="purchase-items")
router.register(r"purchase-records", PurchaseRecordAPIView, basename="purchase-records")
router.register(r"sale-items", SalesItemAPIView, basename="sale-items")
router.register(r"supplier", SupplierAPIView, basename="supplier")

urlpatterns = [
    path("v1/", include(router.urls)),
]
