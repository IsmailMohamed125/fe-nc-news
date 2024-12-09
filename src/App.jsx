import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Articles, { loader as articlesLoader } from "./pages/Articles";
import Topics, { loader as topicsLoader } from "./pages/Topics";
import AppLayout from "./pages/AppLayout";
import Error from "./pages/Error";
import Article, {
  loader as articleLoader,
  commentsAction,
} from "./pages/Article";
import Dashboard, { loader as dashboardLoader } from "./pages/Dashboard";
import Login from "./pages/Login";
import { AuthProvider } from "./contexts/AuthContext";
import ArticleForm, { articleAction } from "./pages/ArticleForm";

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
        loader: dashboardLoader,
        errorElement: <Error />,
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
        action: commentsAction,
        errorElement: <Error />,
      },
      {
        path: "/articles/new",
        element: <ArticleForm />,
        action: articleAction,
        errorElement: <Error />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
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
