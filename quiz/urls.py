from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register("quiz_users", views.QuizUserViewSet)
router.register("categories", views.CategoryViewSet)
router.register("quiz", views.QuizViewSet)

urlpatterns = router.urls
