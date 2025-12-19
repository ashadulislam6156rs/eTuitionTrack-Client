import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Tuitions from "../Pages/Tuitions";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import MyProfile from "../Pages/Dropdown/MyProfile";
import DashboardLayout from "../Layouts/DashboardLayout";
import Tutors from "../Pages/Dashboard/Tutors/Tutors";
import MyTuitions from "../Pages/Dashboard/Students/MyTuitions";
import AddTuition from "../Pages/Dropdown/AddTuition";
import AppliedTutors from "../Pages/Dashboard/Students/AppliedTutors";
import PaymentsHistory from "../Pages/Dashboard/Students/PaymentsHistory";
import TuitionManagement from "../Pages/Dashboard/Admin/TuitionManagement";
import TuitionDetails from "../Componants/TuitionDetails";
import EditeTuition from "../Pages/Dashboard/Students/EditeTuition";
import PaymentSuccess from "../Pages/Dashboard/Students/PaymentSuccess";
import PaymentCancell from "../Pages/Dashboard/Students/PaymentCancell";
import MyApplications from "../Pages/Dashboard/Tutors/MyApplications";
import RevenueHistory from "../Pages/Dashboard/Tutors/RevenueHistory";
import UsersManagement from "../Pages/Dashboard/Admin/UsersManagement";
import ReportsAnalytics from "../Pages/Dashboard/Admin/ReportsAnalytics";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import Error_404 from "../Componants/Error/Error_404";
import TutorRoute from "./TutorRoute";
import StudentRoute from "./StudentRoute";
import PrivacyAndPolicy from "../Componants/PrivacyAndPolicy";
import TermAndConditions from "../Componants/TermAndConditions";
import TutorOngoingTuitions from "../Pages/Dashboard/Tutors/TutorOngoingTuitions";


const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error_404></Error_404>,
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/tuitions",
        Component: Tuitions,
      },
      {
        path: "/tutors",
        Component: Tutors,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/conditions",
        Component: TermAndConditions,
      },
      {
        path: "/privacy",
        Component: PrivacyAndPolicy,
      },
      {
        path: "/tuition-details/:tuitionId",
        Component: TuitionDetails,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <Error_404></Error_404>,
    element: (
      <PrivateRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivateRoutes>
    ),
    children: [
      {
        path: "my-tuitions",
        element: (
          <StudentRoute>
            <MyTuitions></MyTuitions>
          </StudentRoute>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile></MyProfile>,
      },
      {
        path: "add-tuition",
        element: (
          <StudentRoute>
            <AddTuition></AddTuition>
          </StudentRoute>
        ),
      },
      {
        path: "applied-tutors",
        element: (
          <StudentRoute>
            <AppliedTutors></AppliedTutors>
          </StudentRoute>
        ),
      },
      {
        path: "payments-history",
        element: (
          <StudentRoute>
            <PaymentsHistory></PaymentsHistory>
          </StudentRoute>
        ),
      },
      {
        path: "tuition-management",
        element: (
          <AdminRoute>
            <TuitionManagement></TuitionManagement>
          </AdminRoute>
        ),
      },
      {
        path: "tuition/:id/update",
        element: (
          <StudentRoute>
            <EditeTuition></EditeTuition>
          </StudentRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <StudentRoute>
            <PaymentSuccess></PaymentSuccess>
          </StudentRoute>
        ),
      },
      {
        path: "payment-cancel",
        element: (
          <StudentRoute>
            <PaymentCancell></PaymentCancell>
          </StudentRoute>
        ),
      },
      {
        path: "my-applications",
        element: (
          <TutorRoute>
            <MyApplications></MyApplications>
          </TutorRoute>
        ),
      },
      {
        path: "my-ongoing-tuitions",
        element: (
          <TutorRoute>
            <TutorOngoingTuitions></TutorOngoingTuitions>
          </TutorRoute>
        ),
      },
      {
        path: "revenue-history",
        element: (
          <TutorRoute>
            <RevenueHistory></RevenueHistory>
          </TutorRoute>
        ),
      },
      {
        path: "users-management",
        element: (
          <AdminRoute>
            <UsersManagement></UsersManagement>
          </AdminRoute>
        ),
      },
      {
        path: "reports-analytics",
        element: (
          <AdminRoute>
            <ReportsAnalytics></ReportsAnalytics>
          </AdminRoute>
        ),
      },
    ],
  },
]);
export default router;