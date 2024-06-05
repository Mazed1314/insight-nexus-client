import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErorrPage/ErrorPage";
import CreateSurvey from "../Pages/CreateSurvey/CreateSurvey";
import PrivateRoute from "./PrivateRoute";
import Surveys from "../Pages/Surveys/Surveys";
import DashboardLayout from "../Layout/DashboardLayout";
import Pricing from "../Pages/Pricing/Pricing";
import SurveyDetails from "../Pages/Surveys/SurveyDetails";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import SurveyorRoute from "./SurveyorRoute";
// import Payment from "../Pages/Payment/Payment";

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
      // {
      //   path: "/payment",
      //   element: (
      //     <PrivateRoute>
      //       <Payment></Payment>
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/create-survey",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <CreateSurvey></CreateSurvey>
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/view-details/:_id",
        element: (
          <PrivateRoute>
            <SurveyDetails></SurveyDetails>
          </PrivateRoute>
        ),
        // loader: () => fetch("https://insight-nexus-server.vercel.app/surveys"),
        loader: () => fetch("http://localhost:5000/surveys"),
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
          <PrivateRoute>
            <SurveyorRoute>
              <CreateSurvey></CreateSurvey>
            </SurveyorRoute>
          </PrivateRoute>
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
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
            </AdminRoute>
          </PrivateRoute>
        ),
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
