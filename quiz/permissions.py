from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated)


class IsAdminOrMeOrReadOnly(permissions.BasePermission):

    def is_me(self, request, obj):
        user = request.user
        if hasattr(obj, "user"):
            obj_user = obj.user
        elif hasattr(obj, "quiz_user") and hasattr(obj.quiz_user, "user"):
            obj_user = obj.quiz_user.user
        elif hasattr(obj, "quiz") and hasattr(obj.quiz.quiz_user, "user"):
            obj_user = obj.quiz.quiz_user.user
        elif (
            hasattr(obj, "question")
            and hasattr(obj.question, "quiz")
            and hasattr(obj.question.quiz, "quiz_user")
        ):
            obj_user = obj.question.quiz.quiz_user.user

        if obj_user is None:
            return False
        return obj_user == user

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        # if request.method == "POST":
        #     print(request.user)
        #     print(bool(request.user and request.user.is_authenticated))
        return bool(request.user and request.user.is_authenticated)

    # todo: users can still edit each other lists

    def has_object_permission(self, request, view, obj):
        return (
            self.is_me(request, obj)
            or request.method in permissions.SAFE_METHODS
            or request.user.is_staff
        )
