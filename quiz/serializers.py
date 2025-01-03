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


class QuizSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    quiz_user = QuizUserSerializer()

    class Meta:
        model = Quiz
        fields = ["id", "title", "description", "category", "quiz_user"]


class QuestionSerializer(serializers.ModelSerializer):
    # todo read quiz__title from view
    class Meta:
        model = Question
        fields = ["id", "title", "text", "quiz__title"]


class AnswerSerializer(serializers.ModelSerializer):
    # todo read question__title from view
    class Meta:
        model = Answer
        fields = ["id", "text", "is_correct", "question__title"]
