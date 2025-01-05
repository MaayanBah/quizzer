from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register("quiz_users", views.QuizUserViewSet)
router.register("categories", views.CategoryViewSet)
router.register("quiz", views.QuizViewSet)


quiz_router = routers.NestedDefaultRouter(router, "quiz", lookup="quiz")
quiz_router.register("questions", views.QuestionViewSet, basename="quiz-questions")

urlpatterns = router.urls + quiz_router.urls
