from django.contrib import admin

# Register your models here.
from .models import *


class ProductAdmin(admin.ModelAdmin):
    list_display = ["product_name", "category", "brand"]
    search_fields = ["product_name"]


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(SalesItem)
admin.site.register(PurchaseRecord)
admin.site.register(PurchaseItem)
