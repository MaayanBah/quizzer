from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
)
from quiz.permissions import IsAdminOrReadOnly
from .models import QuizUser, Category, Quiz, QuizResult, Question, Answer
from .serializers import (
    QuizUserSerializer,
    CategorySerializer,
    QuizSerializer,
    UpdateQuizSerializer,
    CreateQuizSerializer,
    QuestionSerializer,
    AnswerSerializer,
)


class QuizUserViewSet(ModelViewSet):
    queryset = QuizUser.objects.all()
    serializer_class = QuizUserSerializer
    permission_classes = [IsAdminUser]

    @action(detail=False, methods=["GET", "PUT"], permission_classes=[IsAuthenticated])
    def me(self, request):
        quiz_user = QuizUser.objects.get(user_id=request.user.id)
        if request.method == "GET":
            serializer = QuizUserSerializer(quiz_user)
            return Response(serializer.data)
        elif request.method == "PUT":
            serializer = QuizUserSerializer(quiz_user, data=request.data)
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
        if Quiz.objects.filter(category_id=kwargs["pk"]):
            return Response(
                {
                    "error": "Category cannot be deleted because it includes one or more quizzes."
                },
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        return super().destroy(request, *args, **kwargs)


class QuestionViewSet(ModelViewSet):
    serializer_class = QuestionSerializer

    def get_queryset(self):
        return Question.objects.filter(quiz_id=self.kwargs["quiz_pk"])

    def get_serializer_context(self):
        return {"quiz_id": self.kwargs["quiz_pk"]}


class QuizViewSet(ModelViewSet):
    queryset = Quiz.objects.all()
    http_method_names = ["get", "post", "patch", "delete"]

    def get_serializer_class(self):
        if self.request.method == "POST":
            return CreateQuizSerializer
        elif self.request.method == "PATCH":
            return UpdateQuizSerializer
        return QuizSerializer

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response(
                {"error": "User must be authenticated to create a quiz."},
                status=status.HTTP_405_METHOD_NOT_ALLOWED,
            )
        serializer = CreateQuizSerializer(
            data=request.data, context={"user_id": self.request.user.id}
        )
        print("2views: ", self.request.user.id)
        serializer.is_valid(raise_exception=True)
        quiz = serializer.save()
        serializer = QuizSerializer(quiz)
        return Response(serializer.data)

    # todo add permissions to delete only to the creator or the admin
