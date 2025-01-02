from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from quiz.models import QuizUser


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_quiz_user_for_new_user(sender, **kwargs):
    if kwargs["created"]:
        QuizUser.objects.create(user=kwargs["instance"])
