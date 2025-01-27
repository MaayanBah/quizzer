from django.db import transaction
from rest_framework import serializers
from .models import QuizzerUser, Category, Quizzes, QuizResult, Question, Answer
from core.models import User


class UpdateQuizzerUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizzerUser
        fields = ["birth_date"]

    def update(self, instance, validated_data):
        instance.birth_date = validated_data.get("birth_date", instance.birth_date)
        instance.save()
        return instance

    def validate(self, data):
        data = super().validate(data)

        if "user_id" in data:
            raise serializers.ValidationError("user_id should not be provided.")
        return data


class QuizzerUserSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = QuizzerUser
        fields = [
            "id",
            "user_username",
            "birth_date",
            "user_id",
        ]

    def create(self, validated_data):
        user_id = self.context["request"].user.id
        validated_data["user_id"] = user_id
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user_id = self.context["request"].user.id
        validated_data["user_id"] = user_id
        return super().update(instance, validated_data)


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "description", "slug"]


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id", "text", "is_correct"]


class UpdateAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["text", "is_correct"]

    def create(self, validated_data):
        question_id = self.context["question_id"]
        return Answer.objects.create(question_id=question_id, **validated_data)


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True, read_only=True)

    class Meta:
        model = Question
        fields = ["id", "title", "text", "answers"]

    def create(self, validated_data):
        quiz_id = self.context["quiz_id"]
        return Question.objects.create(quiz_id=quiz_id, **validated_data)


class UpdateQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["title", "text"]

    def create(self, validated_data):
        quiz_id = self.context["quiz_id"]
        return Question.objects.create(quiz_id=quiz_id, **validated_data)


class QuizzesSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)

    class Meta:
        model = Quizzes
        fields = ["id", "title", "description", "category", "quiz_user", "questions"]


class UpdateQuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quizzes
        fields = ["title", "description", "category"]

    def update(self, instance, validated_data):
        instance.id = self.context["quiz_id"]
        instance.title = validated_data.get("title", instance.title)
        instance.category = validated_data.get("category", instance.category)
        instance.description = validated_data.get("description", instance.description)
        instance.save()
        return instance


class CreateQuizSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = Quizzes
        fields = ["title", "description", "category", "id"]

    def save(self, **kwargs):
        with transaction.atomic():
            quiz_user = QuizzerUser.objects.get(user_id=self.context["user_id"])
            quiz = Quizzes.objects.create(
                quiz_user=quiz_user,
                title=self.validated_data["title"],
                description=self.validated_data.get("description", ""),
                category=self.validated_data["category"],
            )
            return quiz
