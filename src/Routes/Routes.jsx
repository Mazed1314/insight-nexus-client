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
import ManageSurveyorSurvey from "../Pages/Dashboard/Surveyor/ManageSurveyorSurvey";
import ViewDetails from "../Pages/Dashboard/Surveyor/ViewDetails";
import ManageComent from "../Pages/Dashboard/Pro/ManageComent";
import ParticipateSurvey from "../Pages/Dashboard/User/ParticipateSurvey";
import Contact from "../Pages/Contact";
import Payments from "../Pages/Dashboard/Admin/Payments";
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

      {
        path: "/surveys",
        element: <Surveys></Surveys>,
      },
      {
        path: "/pricing",
        element: <Pricing></Pricing>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
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
        element: (
          <PrivateRoute>
            <ParticipateSurvey></ParticipateSurvey>
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <ManageComent></ManageComent>
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
              <CreateSurvey></CreateSurvey>
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "surveyor/manage",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <ManageSurveyorSurvey></ManageSurveyorSurvey>
            </SurveyorRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "surveyor/manage/surveys/view-details/:id",
        element: (
          <PrivateRoute>
            <SurveyorRoute>
              <ViewDetails></ViewDetails>
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
            <AdminRoute>
              <Payments></Payments>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
