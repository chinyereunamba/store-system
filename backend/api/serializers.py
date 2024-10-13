from rest_framework import serializers
from base.models import (
    Product,
    PurchaseItem,
    PurchaseRecord,
    SalesItem,
    Brand,
    Category,
    Supplier
)


class ProductSerializer(serializers.ModelSerializer):
    brand_name = serializers.StringRelatedField(source="brand", read_only=True)
    category_name = serializers.StringRelatedField(source="category", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", 
            "product_name", 
            "stock_quantity", 
            "date_created", 
            "brand",        
            "category",     
            "brand_name",   
            "category_name" 
        ]


class PurchaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseItem
        fields = "__all__"


class PurchaseRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseRecord
        fields = "__all__"


class SalesItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = SalesItem
        fields = "__all__"


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
