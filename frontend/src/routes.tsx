import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import UserQuizzes from "./pages/UserQuizzes";
import SignupPage from "./pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <SignupPage /> },
      { path: "my-quizzes", element: <UserQuizzes /> },
    ],
  },
]);

export default router;
