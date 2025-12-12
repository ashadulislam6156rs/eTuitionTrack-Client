import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Container from '../Componants/Container/Container';
import TuitionCard from '../Componants/TuitionCard';


const Tuitions = () => {

  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("")

    const { data: tuitions = []} = useQuery({
      queryKey: ["tuitions-approved" , searchText],
      queryFn: async () => {
        const res = await axiosSecure(
          `/tuitions/approved?searchText=${searchText}`
        );
        return res.data;
      },
    });
  
  
    

    return (
      <div className="pt-17">
        <Container>
          <div className="pb-5 pt-10">
            <h1 className="text-2xl font-bold text-center">
              Find Your Next Tuition
            </h1>
            <p className="text-sm text-center text-base-content/60 py-2">
              Discover tuition requests from students across different classes
              and subjects. Choose the ones that match your skills and schedule.
            </p>
          </div>
          {/* search and Sort */}
          <div className="flex justify-between gap-5 items-center py-10">
            <label className="input">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input
                type="search"
                onChange={(e) => setSearchText(e.target.value)}
                required
                placeholder="Search"
              />
            </label>

            <select
              defaultValue="Server location"
              className="select select-neutral"
            >
              <option disabled={true}>Server location</option>
              <option>North America</option>
              <option>EU west</option>
              <option>South East Asia</option>
            </select>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
            {tuitions?.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition}></TuitionCard>
            ))}
          </div>

          {/* paganation */}
          <div className="flex justify-center items-center pb-10">
            <div className="join gap-3">
              <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="1"
                checked="checked"
              />
              <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="2"
              />
              <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="3"
              />
              <input
                className="join-item btn btn-square"
                type="radio"
                name="options"
                aria-label="4"
              />
            </div>
          </div>
        </Container>
      </div>
    );
};

export default Tuitions;