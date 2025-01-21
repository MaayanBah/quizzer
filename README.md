# Quizzer 🪩

### <font color="red">This project is still in development</font> 🔨

## Table of Contents 📖

- [Backend](#backend)
  - [Login](#login)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Categories](#categories)
    - [User's Quiz](#users-quiz)

## Backend

The project's backend is built with Django and deployed through Heroku app. It can be accessed via:

https://quizzerapp-2c174419668c.herokuapp.com

### Login

To create a user, send a POST request to this URL (visit the URL for more details):

https://quizzerapp-2c174419668c.herokuapp.com/auth/users/

The POST request should look like this:

```json
{
  "username": "",
  "password": "",
  "email": "",
  "first_name": "",
  "last_name": ""
}
```

You can send a POST request to this URL to receive a refresh token and an access token (which is valid for 2 hours):

https://quizzerapp-2c174419668c.herokuapp.com/auth/jwt/create/

The POST request should look like this:

```json
{
  "username": "",
  "password": ""
}
```

Then, add the access token to your headers when using the authorized API endpoints (key: "Authorization", value: "JWT ${access_token}").

### API endpoints

1. #### users

   Anyone can view the users list by sending a GET request to this URL:

   https://quizzerapp-2c174419668c.herokuapp.com/users/

   Each user can send a PATCH request to change their date of birth to one of these URLs:

   - https://quizzerapp-2c174419668c.herokuapp.com/users/${user_id}/
   - https://quizzerapp-2c174419668c.herokuapp.com/users/me/

   The PATCH request should look like this (with the access token in the header):

   ```json
   {
     "birth_date": "2000-01-20"
   }
   ```

   Logged-in users can view each other's quizzes by sending a GET request to this URL (with the access token in the header):

   https://quizzerapp-2c174419668c.herokuapp.com/users/${user_id}/

2. #### Categories

   Everyone can send a GET request to view the categories, but only logged-in users can add a new category (with the access token in the header):
   https://quizzerapp-2c174419668c.herokuapp.com/categories/

   The POST request should look like this:

   ```json
   {
     "name": "",
     "description": "",
     "slug": ""
   }
   ```

   Users can also search for a specific category using its slug via this URL:

   https://quizzerapp-2c174419668c.herokuapp.com/categories/${category_slug}/

3. #### User's Quiz

   <ins>Viewing Quizzes</ins>

   Each user can view their own quizzes by sending a GET request to the following URL:
   https://quizzerapp-2c174419668c.herokuapp.com/quizzes/

   <ins>Adding a New Quiz</ins>

   Users can add a new quiz by sending a POST request to the same URL. The request should include an access token in the header. The body of the request should follow this format:

   ```json
   {
     "title": "",
     "description": "",
     "category": <number>  // The ID of the category
   }
   ```

   <ins>Editing a Quiz</ins>
   Users can edit a specific quiz (only the title, description, and category fields) by sending a PATCH request to this URL:
   https://quizzerapp-2c174419668c.herokuapp.com/quizzes/${quiz_id}/

   The PATCH request should include an access token in the header. The body can contain only the fields that need to be updated:

   ```json
   {
     "title": "",
     "description": "",
     "category": <number>  // The ID of the category
   }
   ```

   <ins>Deleting a Quiz</ins>
   Users can delete a specific quiz by sending a DELETE request to the same URL (with the access token in the header):

   <ins>Adding a New Question</ins>
   To add a new question to a quiz, users can send a POST request to this URL:
   https://quizzerapp-2c174419668c.herokuapp.com/quizzes/${quiz_id}/questions/

   The request must include an access token in the header. The body should look like this:

   ```json
   {
     "title": "",
     "text": ""
   }
   ```

   <ins>Editing or Deleting a Specific Question</ins>
   Users can edit or delete a specific question by sending a PATCH or DELETE request to this URL:
   https://quizzerapp-2c174419668c.herokuapp.com/quizzes/${quiz_id}/questions/${question_id}/

   For a PATCH request, the access token should be included in the header. The body can include only the fields that need to be updated:

   ```json
   {
     "title": "",
     "text": ""
   }
   ```

   <ins>Managing Question Answers</ins>
   To get the answers for a specific question or add a new one, users can send GET or POST requests to this URL:
   https://quizzerapp-2c174419668c.herokuapp.com/quizzes/${quiz_id}/questions/${question_id}/answers/

   The POST request should include an access token in the header and have this body format:

   ```json
   {
     "text": "",
     "is_correct": false
   }
   ```

   To edit or delete a specific answer, users can send PATCH or DELETE requests to this URL:
   https://quizzerapp-2c174419668c.herokuapp.com/quizzes/${quiz_id}/questions/${question_id}/answers/${answer_id}

   For a PATCH request, the access token should be included in the header. The body can contain only the fields that need to be updated:

   ```json
   {
     "text": "",
     "is_correct": false
   }
   ```
