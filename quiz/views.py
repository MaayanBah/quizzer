from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAuthenticated,
)
from quiz.permissions import (
    IsAdminOrReadOnly,
    IsAdminOrMeOrReadOnly,
)
from .models import QuizzerUser, Category, Quizzes, QuizResult, Question, Answer
from .serializers import (
    QuizzerUserSerializer,
    UpdateQuizzerUserSerializer,
    CategorySerializer,
    QuizzesSerializer,
    UpdateQuizSerializer,
    CreateQuizSerializer,
    QuestionSerializer,
    UpdateQuestionSerializer,
    AnswerSerializer,
)


class QuizzerUserViewSet(ModelViewSet):
    queryset = QuizzerUser.objects.all()
    http_method_names = ["get", "patch"]
    permission_classes = [IsAdminOrMeOrReadOnly]

    @action(
        detail=False, methods=["GET", "PATCH"], permission_classes=[IsAuthenticated]
    )
    def me(self, request):
        quiz_user, created = QuizzerUser.objects.get_or_create(user_id=request.user.id)

        if request.method == "GET":
            serializer = QuizzerUserSerializer(quiz_user)
            return Response(serializer.data)

        elif request.method == "PATCH":
            serializer = UpdateQuizzerUserSerializer(
                quiz_user, data=request.data, partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.validated_data["user_id"] = request.user.id
            serializer.save()
            return Response(serializer.data)

    def get_serializer_class(self):
        if self.request.method == "PATCH":
            return UpdateQuizzerUserSerializer
        return QuizzerUserSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAdminOrReadOnly]
    search_fields = ["name"]
    lookup_field = "slug"

    def destroy(self, request, *args, **kwargs):
        if Quizzes.objects.filter(category_id=kwargs["pk"]):
            return Response(
                {
                    "error": "Category cannot be deleted because it includes one or more quizzes."
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        return super().destroy(request, *args, **kwargs)


class AnswerViewSet(ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = [IsAdminOrMeOrReadOnly]

    def get_queryset(self):
        return Answer.objects.filter(question_id=self.kwargs["question_pk"])

    def get_serializer_context(self):
        return {"question_id": self.kwargs["question_pk"]}


class UserAnswerViewSet(ModelViewSet):
    serializer_class = AnswerSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        quizzer_user = QuizzerUser.objects.get(user=self.request.user)
        return Answer.objects.filter(
            question__quiz__quiz_user=quizzer_user,
            question_id=self.kwargs["question_pk"],
        )

    def get_serializer_context(self):
        return {"question_id": self.kwargs["question_pk"]}


class QuestionViewSet(ModelViewSet):
    permission_classes = [IsAdminOrMeOrReadOnly]

    def get_queryset(self):
        return Question.objects.filter(quiz_id=self.kwargs["quizzes_pk"])

    def get_serializer_context(self):
        return {"quiz_id": self.kwargs["quizzes_pk"]}

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST", "PUT"]:
            return UpdateQuestionSerializer
        return QuestionSerializer


class UserQuestionViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        quizzer_user = QuizzerUser.objects.get(user=self.request.user)
        return Question.objects.filter(
            quiz__quiz_user=quizzer_user, quiz_id=self.kwargs["quizzes_pk"]
        )

    def get_serializer_context(self):
        return {"quiz_id": self.kwargs["quizzes_pk"]}

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return UpdateQuestionSerializer
        return QuestionSerializer


class QuizzesViewSet(ModelViewSet):
    queryset = Quizzes.objects.all()
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = [IsAdminOrMeOrReadOnly]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateQuizSerializer
        elif self.request.method == "PATCH":
            return UpdateQuizSerializer
        return QuizzesSerializer

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"error": "User must be authenticated to create a quiz."},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        serializer = CreateQuizSerializer(
            data=request.data, context={"user_id": self.request.user.id}
        )
        serializer.is_valid(raise_exception=True)
        quiz = serializer.save()
        serializer = QuizzesSerializer(quiz)
        return Response(serializer.data)


class UserQuizzesViewSet(ModelViewSet):
    serializer_class = QuizzesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        quizzer_user = QuizzerUser.objects.get(user=self.request.user)
        return Quizzes.objects.filter(quiz_user_id=quizzer_user.id)
