import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import ErrorPage from "../Pages/ErorrPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import Surveys from "../Pages/Surveys/Surveys";
import DashboardLayout from "../Layout/DashboardLayout";
import Pricing from "../Pages/Pricing/Pricing";
import SurveyDetails from "../Pages/Surveys/SurveyDetails";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers";
import SurveyorRoute from "./SurveyorRoute";
import MyReport from "../Pages/Dashboard/User/MyReport";
import ManageSurvey from "../Pages/Dashboard/Admin/ManageSurvey";
import ManageSurveyDetails from "../Pages/Dashboard/Admin/ManageSurveyDetails";
import Profile from "../Pages/Dashboard/Profile";
import EditProfile from "../Pages/Dashboard/EditProfile";
import CreateSurvey from "../Pages/Dashboard/Surveyor/CreateSurvey";
import EditSurvey from "../Pages/Dashboard/Surveyor/EditSurvey";
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
            <CreateSurvey></CreateSurvey>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-survey/:id",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <EditSurvey></EditSurvey>
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
      },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "profile/edit-user/:id",
        element: (
          <PrivateRoute>
            <EditProfile></EditProfile>
          </PrivateRoute>
        ),
      },
      // ---------------------------------------------------------------
      //  User Dashboard:
      // --------------------------------------------------------------
      {
        path: "user/surveys",
        element: <PrivateRoute>{/* Participate in surveys */}</PrivateRoute>,
      },
      {
        path: "user/my-reports",
        element: (
          <PrivateRoute>
            <MyReport></MyReport>
          </PrivateRoute>
        ),
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
            <CreateSurvey></CreateSurvey>
          </PrivateRoute>
        ),
      },
      {
        path: "surveyor/manage",
        element: (
          <PrivateRoute>
            <CreateSurvey></CreateSurvey>
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
        path: "admin/surveys",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageSurvey></ManageSurvey>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/surveys/view-details/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageSurveyDetails></ManageSurveyDetails>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers></ManageUsers>
              {/* Filter users by role. */}
            </AdminRoute>
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
