from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.http import JsonResponse
from django.utils.timezone import now, timedelta
from django.db.models import Q, Count, Sum


class SalesPagination(PageNumberPagination):
    page_size = 10


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


def get_latest_sales(request):
    last_sales = SalesItem.objects.order_by("-date_created")[:5]

    sales_data = [
        {
            "product": sale.product.product_name,
            "quantity_sold": sale.quantity_sold,
            "selling_price": sale.unit_price,
            "sale_date": sale.date_created,
        }
        for sale in last_sales
    ]
    return JsonResponse(sales_data, safe=False)


class SalesByLastDaysAPIView(ListAPIView):
    serializer_class = SalesItemSerializer
    pagination_class = SalesPagination

    def get_queryset(self):
        days_ago = self.request.query_params.get("days", 5)  
        start_date = now().date() - timedelta(days=int(days_ago))
        return SalesItem.objects.filter(date_created__gte=start_date)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        grouped_sales = {}
        for sale in queryset.order_by("-date_created"):
            date_key = sale.date_created.strftime("%Y-%m-%d")  
            if date_key not in grouped_sales:
                grouped_sales[date_key] = []
            grouped_sales[date_key].append(sale)

        # Formatting the response data to return grouped sales
        response_data = []
        for date, sales in grouped_sales.items():
            sales_data = SalesItemSerializer(sales, many=True).data
            response_data.append({"date": date, "sales": sales_data})

        return Response(response_data)


class SalesByLastDaysViewSet(ViewSet):
    def list(self, request):
        days = int(
            request.query_params.get("days", 7)
        )  # Default to 7 days if not provided
        start_date = now() - timedelta(days=days)

        # Filter sales within the date range and order by day
        sales = (
            SalesItem.objects.filter(date_created__gte=start_date)
            .values("date_created")
            .annotate(total_sales=Sum("unit_price"))
            .order_by("date_created")
        )

        page = self.paginate_queryset(sales)
        if page is not None:
            return self.get_paginated_response(page)

        return Response(sales)
