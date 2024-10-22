from rest_framework import serializers
from base.models import (
    Product,
    PurchaseItem,
    PurchaseRecord,
    SalesItem,
    Brand,
    Category,
    Supplier,
)


class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.StringRelatedField(source="brand", read_only=True)
    category_name = serializers.StringRelatedField(source="category", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id",
            "product_name",
            "brand",
            "category",
            "stock_quantity",
            "brand_name",
            "category_name",
            "cost_price",
            "date_created",
        ]


class PurchaseItemSerializer(serializers.ModelSerializer):
    product_name = serializers.StringRelatedField(source="product", read_only=True)
    brand_name = serializers.StringRelatedField(source="product.brand", read_only=True)
    category_name = serializers.StringRelatedField(
        source="product.category", read_only=True
    )
    order_detail = serializers.SerializerMethodField()

    class Meta:
        model = PurchaseItem
        fields = [
            "id",
            "product",
            "quantity",
            "unit_price",
            "purchase_order",
            "product_name",
            "brand_name",
            "category_name",
            "order_detail",
            "total_amount"
        ]

    def get_order_detail(self, obj):
        pass


class PurchaseRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseRecord
        fields = "__all__"


class SalesItemSerializer(serializers.ModelSerializer):
    product_name = serializers.StringRelatedField(source="product", read_only=True)
    brand_name = serializers.StringRelatedField(source="product.brand", read_only=True)
    category_name = serializers.StringRelatedField(
        source="product.category", read_only=True
    )

    class Meta:
        model = SalesItem
        fields = [
            "id",
            "sale_id",
            "product",
            "product_name",
            "brand_name",
            "category_name",
            "quantity_sold",
            "unit_price",
        ]


class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = "__all__"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"
