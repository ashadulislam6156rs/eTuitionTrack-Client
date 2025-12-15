import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Componants/Loading/Loading';
import Forbidden from '../Componants/Forbidden/Forbidden';


const TutorRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "Tutor") {
    return <Forbidden></Forbidden>
  }
  return children;
};

export default TutorRoute;