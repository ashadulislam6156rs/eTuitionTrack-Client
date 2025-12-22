import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Container from './Container/Container';
import TuitionCard from './TuitionCard';

const LatestTuitions = () => {

    const axiosSecure = useAxiosSecure();

    const { data: tuitions = [] } = useQuery({
      queryKey: ["tuitions-approved"],
      queryFn: async () => {
        const res = await axiosSecure("/latest/tuitions");
        return res.data;
      },
    });
   


    return (
      <div>
        <Container>
          <h2 className="text-4xl pt-7 font-bold text-center text-gray-900 mb-4">
            Latest Tuitions
          </h2>
          <p className="text-center text-gray-600 md:w-2/3 mx-auto mb-10">
            Stay updated with the most recent tuition posts and explore a wide
            range of learning opportunities. Whether you're looking for
            subject-specific guidance, home tuition, or online support, here you
            can find the perfect match that fits your academic goals and
            learning style.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
            ))}
          </div>
        </Container>
      </div>
    );
};

export default LatestTuitions;