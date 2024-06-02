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
// import AdminRoute from "./AdminRoute";

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
    children: [
      // {
      //   index: true,
      //   element: (
      //     <PrivateRoute>
      //       <Statistics />
      //     </PrivateRoute>
      //   ),
      // },

      // ---------------------------------------------------------------
      //  User Dashboard:
      // --------------------------------------------------------------
      {
        path: "user/surveys",
        element: <PrivateRoute>{/* Participate in surveys */}</PrivateRoute>,
      },
      {
        path: "user/my-reports",
        element: <PrivateRoute>{/* Reported surveys */}</PrivateRoute>,
      },
      // (only pro-user can access this page)
      {
        path: "user/comments",
        element: <PrivateRoute>{/* Reported surveys */}</PrivateRoute>,
      },
      // ---------------------------------------------------------------
      //  Surveyor Dashboard:
      // --------------------------------------------------------------
      {
        path: "surveyor/create",
        element: (
          <PrivateRoute>{/* Survey creation with questions. */}</PrivateRoute>
        ),
      },
      {
        path: "surveyor/update/:id",
        element: <PrivateRoute>{/* Survey update */}</PrivateRoute>,
      },
      // ---------------------------------------------------------------
      //  Admin Dashboard:
      // --------------------------------------------------------------

      {
        path: "admin/users",
        element: <PrivateRoute>{/* Manage users and roles */}</PrivateRoute>,
      },
      {
        path: "admin/surveys",
        element: (
          <PrivateRoute>
            {/* Publish/unpublish surveys.  */}
            {/* Filter users by role. */}
          </PrivateRoute>
        ),
      },
      {
        path: "admin/payments",
        element: (
          <PrivateRoute>
            {/* View all payments and survey responses.  */}
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
