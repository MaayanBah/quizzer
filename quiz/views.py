from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
)
from quiz.permissions import IsAdminOrReadOnly, IsAdminOrQuizCreator
from .models import QuizzerUser, Category, Quizzes, QuizResult, Question, Answer
from .serializers import (
    QuizzerUserSerializer,
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
    serializer_class = QuizzerUserSerializer

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        quiz_user = QuizzerUser.objects.get(user_id=request.user.id)
        if request.method == "GET":
            serializer = QuizzerUserSerializer(quiz_user)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = QuizzerUserSerializer(quiz_user, data=request.data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)


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

    def get_queryset(self):
        return Answer.objects.filter(question_id=self.kwargs["question_pk"])

    def get_serializer_context(self):
        return {"question_id": self.kwargs["question_pk"]}


class QuestionViewSet(ModelViewSet):
    http_method_names = ["get", "post", "patch", "delete"]

    def get_queryset(self):
        return Question.objects.filter(quiz_id=self.kwargs["quizzes_pk"])

    def get_serializer_context(self):
        return {"quiz_id": self.kwargs["quizzes_pk"]}

    def get_serializer_class(self):
        if self.request.method in ["PATCH", "POST"]:
            return UpdateQuestionSerializer
        return QuestionSerializer


class QuizzesViewSet(ModelViewSet):
    queryset = Quizzes.objects.all()
    http_method_names = ["get", "post", "patch", "delete"]
    permission_classes = [IsAdminOrQuizCreator]

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
