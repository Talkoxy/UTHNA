from django.contrib import admin
from .models import ClientTranslation


@admin.register(ClientTranslation)
class ClientTranslationAdmin(admin.ModelAdmin):
    list_display = ('user', 'original_text', 'translated_text',
                    'created_at', 'is_saved', 'is_liked')
    list_filter = ('is_saved', 'is_liked', 'created_at',
                   'source_language', 'target_language')
    search_fields = ('user__username', 'original_text', 'translated_text')
    readonly_fields = ('id', 'created_at')
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

    fieldsets = (
        ('User Information', {
            'fields': ('user', 'created_at')
        }),
        ('Translation Details', {
            'fields': ('original_text', 'translated_text', 'source_language', 'target_language')
        }),
        ('Status', {
            'fields': ('is_saved', 'is_liked')
        })
    )
