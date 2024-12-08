import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Surveys from "../pages/Surveys";
import Pricing from "../pages/Pricing";
import Contact from "../pages/Contact";
import CreateSurvey from "../components/dashboard/surveyor/CreateSurvey";
import SurveyorRoute from "./SurveyorRoute";
import PrivateRoute from "./PrivateRoute";
import EditSurvey from "../components/dashboard/surveyor/EditSurvey";
import SurveyDetails from "../components/surveys/SurveyDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashboardLayout from "../layout/DashboardLayout";
import Profile from "../components/dashboard/Profile";
import EditProfile from "../components/dashboard/EditProfile";
import ParticipateSurvey from "../components/dashboard/user/ParticipateSurvey";
import MyReport from "../components/dashboard/user/MyReport";
import ManageComent from "../components/dashboard/pro_user/ManageComent";
import ManageSurveyorSurvey from "../components/dashboard/surveyor/ManageSurveyorSurvey";
import ViewDetails from "../components/dashboard/surveyor/ViewDetails";
import ManageSurvey from "../components/dashboard/admin/ManageSurvey";
import AdminRoute from "./AdminRoute";
import ManageSurveyDetails from "../components/dashboard/admin/ManageSurveyDetails";
import ManageUsers from "../components/dashboard/admin/ManageUsers";
import Payments from "../components/dashboard/admin/Payments";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/surveys",
        element: <Surveys />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/create-survey",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <CreateSurvey />
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-survey/:id",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <EditSurvey />
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "/view-details/:_id",
        element: (
          <PrivateRoute>
            <SurveyDetails />
          </PrivateRoute>
        ),
      },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/edit-user/:id",
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        ),
      },
      // ---------------------------------------------------------------
      //  User Dashboard:
      // --------------------------------------------------------------
      {
        path: "user/surveys",
        element: (
          <PrivateRoute>
            <ParticipateSurvey />
          </PrivateRoute>
        ),
      },
      {
        path: "user/my-reports",
        element: (
          <PrivateRoute>
            <MyReport />
          </PrivateRoute>
        ),
      },
      // (only pro-user can access this page)
      {
        path: "user/comments",
        element: (
          <PrivateRoute>
            <ManageComent />
          </PrivateRoute>
        ),
      },
      // ---------------------------------------------------------------
      //  Surveyor Dashboard:
      // --------------------------------------------------------------
      {
        path: "surveyor/create",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <CreateSurvey />
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "surveyor/manage",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <ManageSurveyorSurvey />
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "surveyor/manage/surveys/view-details/:id",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <ViewDetails />
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      // ---------------------------------------------------------------
      //  Admin Dashboard:
      // --------------------------------------------------------------

      {
        path: "admin/surveys",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageSurvey />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/surveys/view-details/:id",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageSurveyDetails />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
              {/* Filter users by role. */}
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin/payments",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <Payments />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
