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
            "selling_price",
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
            "total_amount",
        ]

    def get_order_detail(self, obj):
        pass


class ProductInPurchase(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


class ProductInRecord(serializers.ModelSerializer):
    product_name = serializers.StringRelatedField(source="product")
    brand_name = serializers.StringRelatedField(source="product.brand")
    category_name = serializers.StringRelatedField(source="product.category")

    class Meta:
        model = PurchaseItem
        fields = [
            "id",
            "product",
            "quantity",
            "product_name",
            "unit_price",
            "brand_name",
            "category_name",
        ]


class PurchaseRecordSerializer(serializers.ModelSerializer):
    products = ProductInRecord(many=True, source="purchaseitem_set", required=False)
    supplier_name = serializers.StringRelatedField(source="supplier", read_only=True)

    class Meta:
        model = PurchaseRecord
        fields = [
            "id",
            "total_amount",
            "purchase_date",
            "supplier",
            "supplier_name",
            "products",
        ]


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
            "cost_price",
            "unit_price",
            "total_amount",
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
