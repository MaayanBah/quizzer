import { createBrowserRouter } from "react-router-dom";
import CreateQuizPage from "./pages/CreateQuizPage";
import HomePage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import SignupPage from "./pages/SignupPage";
import UserQuizPage from "./pages/UserQuizPage";
import UserQuizzesPage from "./pages/UserQuizzesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignupPage /> },
      { path: "my-quizzes", element: <UserQuizzesPage /> },
      { path: "my-quizzes/:id", element: <UserQuizPage /> },
      { path: "create-quiz", element: <CreateQuizPage /> },
    ],
  },
]);

export default router;
