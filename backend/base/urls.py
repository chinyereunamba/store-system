from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r"brands", BrandAPIView, basename="brands")
router.register(r"category", CategoryAPIView, basename="category")
router.register(r"products", ProductAPIView, basename="products")
router.register(r"purchase-items", PurchaseItemAPIView, basename="purchase-items")
router.register(r"purchase-records", PurchaseRecordAPIView, basename="purchase-records")
router.register(r"sales", SalesItemAPIView, basename="sales")
router.register(r"supplier", SupplierAPIView, basename="supplier")
router.register(
    r"sales-by-last-days", SalesByLastDaysViewSet, basename="sales-by-last-days"
)

urlpatterns = [
    path("v1/", include(router.urls)),
    path("v1/latest-sales/", get_latest_sales, name="latest-sales"),
    path('v1/monthly-revenue/', MonthlyRevenueAPIView.as_view(), name='monthly-revenue'),
    path("v1/sales-by-days/", SalesByLastDaysAPIView.as_view()),
    path("v1/bulk-purchase-upload/", AddPurchaseItems.as_view()),
    path("v1/bulk-products-upload/", AddProducts.as_view()),
    path("v1/bulk-sales-upload/", AddSales.as_view()),
]
