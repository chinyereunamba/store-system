from datetime import datetime
from django.db.models import Sum, F
from rest_framework import status
from rest_framework.viewsets import ModelViewSet, ViewSet
from .models import *
from .serializers import *
from rest_framework.permissions import AllowAny
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST
from django.http import JsonResponse
from django.utils.timezone import now, timedelta
from django.db.models import Q, Count, Sum


class SalesPagination(PageNumberPagination):
    page_size = 10
    max_page_size = 5


class ProductAPIView(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]


class PurchaseItemAPIView(ModelViewSet):
    permission_classes = [AllowAny]
    queryset = PurchaseItem.objects.all()
    serializer_class = PurchaseItemSerializer


class PurchaseRecordAPIView(ModelViewSet):
    queryset = PurchaseRecord.objects.all().order_by("-purchase_date")
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


class MonthlyRevenueAPIView(APIView):
    """
    API View to calculate revenue by month.
    """

    def get(self, request):
        try:
            # Get query parameters
            year = request.query_params.get("year", datetime.now().year)

            # Validate year
            if not str(year).isdigit() or int(year) < 0:
                return Response(
                    {"error": "Invalid year provided."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            year = int(year)

            # Query the database to calculate monthly revenue
            monthly_revenue = (
                SalesItem.objects.filter(date_created__year=year)
                .annotate(month=F("date_created__month"))  # Extract the month
                .values("month")
                # Calculate revenue
                .annotate(revenue=Sum(F("quantity_sold") * F("unit_price")))
                .order_by("month")
            )

            # Format the response
            revenue_by_month = {
                entry["month"]: entry["revenue"] for entry in monthly_revenue
            }

            # Ensure all months are present
            full_revenue = {
                month: revenue_by_month.get(month, 0) for month in range(1, 13)
            }

            return Response(
                {"year": year, "monthly_revenue": full_revenue},
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SalesByLastDaysAPIView(ListAPIView):
    serializer_class = SalesItemSerializer
    pagination_class = SalesPagination

    def get_queryset(self):
        days_ago = self.request.query_params.get("days", 7)
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


class BulkUpload(APIView):
    serializer_class = None

    def post(self, request):
        purchase_items_data = request.data
        if isinstance(purchase_items_data, list):
            serializer = self.serializer_class(data=purchase_items_data, many=True)
        else:
            serializer = self.serializer_class(data=purchase_items_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


# class BulkUpload(APIView):
#     serializer_class = None

#     model = None  # Specify the model in the view that inherits this

#     def post(self, request):
#         if not self.serializer_class or not self.model:
#             return Response(
#                 {"error": "serializer_class and model must be specified"},
#                 status=HTTP_400_BAD_REQUEST,
#             )

#         # Get data from the request
#         data = request.data

#         # Check if data is a list to handle multiple objects
#         is_multiple = isinstance(data, list)

#         # Initialize serializer with `many=True` if handling multiple objects
#         serializer = self.serializer_class(data=data, many=is_multiple)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=HTTP_201_CREATED)

#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


class AddPurchaseItems(BulkUpload):
    serializer_class = PurchaseItemSerializer


class AddSales(BulkUpload):
    serializer_class = SalesItemSerializer


class AddProducts(BulkUpload):
    serializer_class = ProductSerializer
