from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register("users", views.QuizzerUserViewSet)
router.register("categories", views.CategoryViewSet)
router.register("quizzes", views.QuizzesViewSet)


quiz_router = routers.NestedDefaultRouter(router, "quizzes", lookup="quizzes")
quiz_router.register("questions", views.QuestionViewSet, basename="quizzes-questions")

question_router = routers.NestedDefaultRouter(
    quiz_router, "questions", lookup="question"
)
question_router.register("answers", views.AnswerViewSet, basename="question-answers")

urlpatterns = router.urls + quiz_router.urls + question_router.urls
