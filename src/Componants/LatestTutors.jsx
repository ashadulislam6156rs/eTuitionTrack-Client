import React from 'react';
import Container from './Container/Container';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import TutorCard from '../Pages/Dashboard/Tutors/TutorCard';
import { motion } from "framer-motion";

const LatestTutors = () => {


    const axiosSecure = useAxiosSecure();

    const { data: tutors = [] } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
        const res = await axiosSecure.get("/users/tutor/role");
        return res.data;
      },
    });
  
    const containerVariants = {
      hidden: { opacity: 0, y: 30 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
          staggerChildren: 0.15,
          delayChildren: 0.2,
        },
      },
    };

//  const cardVariants = {
//    hidden: { opacity: 0, scale: 0.9, y: 20 },
//    show: {
//      opacity: 1,
//      scale: 1,
//      y: 0,
//      transition: { duration: 0.5, ease: "easeOut" },
//    },
//  };

    return (
      <Container className={`bg-base-200`}>
        <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show">
          <motion.h2
            variants={containerVariants}
            className="text-4xl pt-7 font-bold text-center text-gray-900 dark:text-white mb-4">
            Latest Tutors
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-300 md:w-2/3 mx-auto mb-10">
            Meet our newest tutors who have recently joined the platform.
            Explore qualified and verified educators offering personalized
            guidance across a wide range of subjects to help you achieve your
            academic goals.
          </p>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor}></TutorCard>
            ))}
          </div>
        </motion.div>
      </Container>
    );
};

export default LatestTutors;