# from django.contrib import admin
# from django.urls import path, include, re_path
# from django.conf import settings
# from django.conf.urls.static import static
# from django.views.generic import TemplateView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('ayadi/', include('ayadiapp.urls')),
#     path('', TemplateView.as_view(template_name='index.html')),  # Sert index.html de React pour la route principale
#     # Routes spécifiques pour les fichiers du dossier build
#     re_path(r'^manifest.json$', TemplateView.as_view(template_name="build/manifest.json", content_type="application/json")),
#     re_path(r'^logo192.png$', TemplateView.as_view(template_name="build/logo192.png", content_type="image/png")),
#     re_path(r'^favicon.ico$', TemplateView.as_view(template_name="build/favicon.ico", content_type="image/x-icon")),
    
# ]

# # Configurations pour les fichiers statiques et médias
# urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.static import serve
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('ayadi/', include('ayadiapp.urls')),
    path('', TemplateView.as_view(template_name='index.html')),  # Assurez-vous que ce chemin existe

    # Servir directement les fichiers manifest.json, logo192.png et favicon.ico depuis payment-form/build
    re_path(r'^manifest.json$', serve, {
        'document_root': os.path.join(settings.BASE_DIR, 'payment-form', 'build'),
        'path': 'manifest.json',
    }),
    re_path(r'^logo192.png$', serve, {
        'document_root': os.path.join(settings.BASE_DIR, 'payment-form', 'build'),
        'path': 'logo192.png',
    }),
    re_path(r'^favicon.ico$', serve, {
        'document_root': os.path.join(settings.BASE_DIR, 'payment-form', 'build'),
        'path': 'favicon.ico',
    }),
]

# Configurations pour les fichiers statiques et médias
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
