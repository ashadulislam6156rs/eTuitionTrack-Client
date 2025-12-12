import React from 'react';
import Container from './Container/Container';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TutorCard from '../Pages/Dashboard/Tutors/TutorCard';

const LatestTutors = () => {


    const axiosSecure = useAxiosSecure();

    const { data: users = [] } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users");
        return res.data;
      },
    });

    const tutors = users.filter((user) => user.userRole === "Tutor").slice(0, 8);

    return (
      <Container className={`bg-base-200`}>
        <h2 className="text-4xl pt-7 font-bold text-center text-gray-900 dark:text-white mb-4">
          Latest Tutors
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-300 md:w-2/3 mx-auto mb-10">
          Meet our newest tutors who have recently joined the platform. Explore
          qualified and verified educators offering personalized guidance across
          a wide range of subjects to help you achieve your academic goals.
        </p>

        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
          ))}
        </div>
      </Container>
    );
};

export default LatestTutors;