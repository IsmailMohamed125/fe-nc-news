import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Articles, { loader as articlesLoader } from "./pages/Articles";
import Topics, { loader as topicsLoader } from "./pages/Topics";
import AppLayout from "./pages/AppLayout";
import Error from "./pages/Error";
import Article, { loader as articleLoader } from "./pages/Article";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import { commentFormAction } from "./components/CommentForm";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
        errorElement: <Error />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/topics",
        element: <Topics />,
        loader: topicsLoader,
        errorElement: <Error />,
      },
      {
        path: "/articles",
        element: <Articles />,
        loader: articlesLoader,
        errorElement: <Error />,
      },
      {
        path: "/articles/:articleID",
        element: <Article />,
        loader: articleLoader,
        action: commentFormAction,
        errorElement: <Error />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      // {
      //   path: "/article/new",
      //   element: <CreateArticle />,
      //   action: createArticleAction,
      // },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
