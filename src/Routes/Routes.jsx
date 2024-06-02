import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import CreateSurvey from "../Pages/CreateSurvey/CreateSurvey";
import PrivateRoute from "./PrivateRoute";
import Surveys from "../Pages/Surveys/Surveys";
import DashboardLayout from "../Layout/DashboardLayout";
import ErrorPage from "../Component/Shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/create-survey",
        element: (
          <PrivateRoute>
            <CreateSurvey></CreateSurvey>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <Login></Login> },
  { path: "/register", element: <Register></Register> },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [],
  },
]);

export default router;
