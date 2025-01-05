from django.db import transaction
from rest_framework import serializers
from .models import QuizUser, Category, Quiz, QuizResult, Question, Answer
from core.models import User


class QuizUserSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = QuizUser
        fields = ["id", "user_username", "birth_date"]


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description", "slug"]


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id", "title", "text"]

    def create(self, validated_data):
        quiz_id = self.context["quiz_id"]
        return Question.objects.create(quiz_id=quiz_id, **validated_data)


class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "category", "quiz_user", "questions"]


class UpdateQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["title", "description", "category"]


class CreateQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "category"]

    def save(self, **kwargs):
        with transaction.atomic():
            quiz_user = QuizUser.objects.get(user_id=self.context["user_id"])
            quiz = Quiz.objects.create(
                quiz_user=quiz_user,
                title=self.validated_data["title"],
                description=self.validated_data.get("description", ""),
                category=self.validated_data["category"],
            )
            return quiz


class AnswerSerializer(serializers.ModelSerializer):
    # todo read question__title from view
    class Meta:
        model = Answer
        fields = ["id", "text", "is_correct", "question__title"]
