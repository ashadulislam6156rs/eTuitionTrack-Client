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
import Settings from "../Pages/Dropdown/Settings";
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
import UsersManagment from "../Pages/Dashboard/Admin/UsersManagment";
import ReportsAnalytics from "../Pages/Dashboard/Admin/ReportsAnalytics";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/",
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
        path: "/profile-settings",
        Component: MyProfile,
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
    Component: DashboardLayout,
    children: [
      {
        path: "my-tuitions",
        element: <MyTuitions></MyTuitions>,
      },
      {
        path: "add-tuition",
        element: <AddTuition></AddTuition>,
      },
      {
        path: "applied-tutors",
        element: <AppliedTutors></AppliedTutors>,
      },
      {
        path: "payments-history",
        element: <PaymentsHistory></PaymentsHistory>,
      },
      {
        path: "tuition-management",
        element: <TuitionManagement></TuitionManagement>,
      },
      {
        path: "tuition/:id/update",
        element: <EditeTuition></EditeTuition>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancell></PaymentCancell>,
      },
      {
        path: "my-applications",
        element: <MyApplications></MyApplications>,
      },
      {
        path: "revenue-history",
        element: <RevenueHistory></RevenueHistory>,
      },
      {
        path: "users-managment",
        element: <UsersManagment></UsersManagment>,
      },
      {
        path: "reports-analytics",
        element: <ReportsAnalytics></ReportsAnalytics>,
      },
    ],
  },
]);
export default router;