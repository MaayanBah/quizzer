from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import QuizUser, Category, Quiz, QuizResult, Question, Answer
from .serializers import (
    QuizUserSerializer,
    CategorySerializer,
    QuizSerializer,
    QuestionSerializer,
    AnswerSerializer,
)
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
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
