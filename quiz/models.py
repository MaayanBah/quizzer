from django.db import models
from django.conf import settings
from django.utils.text import slugify
from uuid import uuid4


class QuizzerUser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    birth_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.first_name}'s Quiz Profile"


class Category(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["name"]


class Quizzes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(
        Category, related_name="quizzes", on_delete=models.CASCADE
    )
    quiz_user = models.ForeignKey(
        QuizzerUser, related_name="quizzes", on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["created_at"]


class QuizResult(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="quiz_results", on_delete=models.CASCADE
    )
    quiz = models.ForeignKey(
        Quizzes, related_name="quiz_results", on_delete=models.CASCADE
    )
    score = models.IntegerField()
    completed_at = models.DateTimeField(auto_now_add=True)


class Question(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    text = models.TextField()
    quiz = models.ForeignKey(
        Quizzes, related_name="questions", on_delete=models.CASCADE
    )
    position = models.IntegerField()

    def __str__(self) -> str:
        return self.text

    def save(self, *args, **kwargs):
        if self.quiz.questions.count() >= 60:
            raise ValueError("A quiz can have 60 questions at most.")
        super().save(*args, **kwargs)

    class Meta:
        ordering = ["position"]


class Answer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4)
    question = models.ForeignKey(
        Question, related_name="answers", on_delete=models.CASCADE
    )
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text

    def save(self, *args, **kwargs):
        if self.question.answers.count() >= 4:
            raise ValueError("A question can have 4 answers at most.")
        super().save(*args, **kwargs)
