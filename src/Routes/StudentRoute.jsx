import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Componants/Loading/Loading";
import Forbidden from "../Componants/Forbidden/Forbidden";

const StudentRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "Student") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default StudentRoute;
