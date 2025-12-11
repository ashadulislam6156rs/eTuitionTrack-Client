import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Container from '../../../Componants/Container/Container';
import TutorCard from './TutorCard';

const Tutors = () => {

    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });
  
const tutors = users.filter((user) => user.userRole === "Tutor");



    
    return (
      <div className="pt-17">
        <Container>
          <div className="pb-5 pt-10">
            <h1 className="text-2xl font-bold text-center">
              Explore Available Tuitions
            </h1>
            <p className="text-sm text-center md:w-3/4 mx-auto text-base-content/60 py-2">
              Browse verified tuition requests from students and find
              opportunities that match your expertise, location, and preferred
              schedule. Start teaching and grow your tutoring career.
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5">
            {tutors?.map((tutor) => (
              <TutorCard key={tutor?._id} tutor={tutor}></TutorCard>
            ))}
          </div>
        </Container>
      </div>
    );
};

export default Tutors;