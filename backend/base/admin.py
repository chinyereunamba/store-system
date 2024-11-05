from django.contrib import admin

# Register your models here.
from .models import *


class ProductAdmin(admin.ModelAdmin):
    list_display = ["product_name", "stock_quantity","category", "brand"]
    search_fields = ["product_name"]


class PurchaseItemAdmin(admin.ModelAdmin):
    list_display = [
        "product",
        "unit_price",
        "quantity",
        "purchase_order",
    ]
    search_fields = ["product"]


class PurchaseRecordAdmin(admin.ModelAdmin):
    list_display = ["supplier", "total_amount", "purchase_date"]
    search_fields = ("supplier",)


class SaleItemAdmin(admin.ModelAdmin):
    list_display = ["product", "sale_id", "quantity_sold", "unit_price"]
    search_fields = ("product",)


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(SalesItem, SaleItemAdmin)
admin.site.register(PurchaseRecord, PurchaseRecordAdmin)
admin.site.register(PurchaseItem, PurchaseItemAdmin)
