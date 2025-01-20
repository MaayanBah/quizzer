from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register("users", views.QuizzerUserViewSet)
router.register("categories", views.CategoryViewSet)
router.register("quizzes", views.UserQuizzesViewSet, basename="quizzes")

users_router = routers.NestedDefaultRouter(router, "users", lookup="user")
users_router.register("quizzes", views.QuizzesViewSet, basename="quizzes")

user_quizzes_router = routers.NestedDefaultRouter(
    users_router, "quizzes", lookup="quizzes"
)
user_quizzes_router.register(
    "questions", views.QuestionViewSet, basename="user-quiz-questions"
)


user_quiz_questions_router = routers.NestedDefaultRouter(
    user_quizzes_router, "questions", lookup="question"
)
user_quiz_questions_router.register(
    "answers", views.AnswerViewSet, basename="question-answers"
)


quiz_router = routers.NestedDefaultRouter(router, "quizzes", lookup="quizzes")
quiz_router.register(
    "questions", views.UserQuestionViewSet, basename="quizzes-questions"
)

question_router = routers.NestedDefaultRouter(
    quiz_router, "questions", lookup="question"
)
question_router.register(
    "answers", views.UserAnswerViewSet, basename="question-answers"
)

urlpatterns = (
    router.urls
    + quiz_router.urls
    + question_router.urls
    + users_router.urls
    + user_quizzes_router.urls
    + user_quiz_questions_router.urls
)
