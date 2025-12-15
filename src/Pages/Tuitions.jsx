import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Container from "../Componants/Container/Container";
import TuitionCard from "../Componants/TuitionCard";
import Loading from "../Componants/Loading/Loading";

const Tuitions = () => {
  const axiosSecure = useAxiosSecure();

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  // Fetch with Pagination
  const { data, isLoading } = useQuery({
    queryKey: ["tuitions-approved", page, searchText],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions/approved", {
        params: { page, limit, searchText },
      });
      return res.data;
    },
  });

  const tuitions = data?.data || [];
  const totalPages = data?.pages || 1;


  // if (isLoading) {
  //   return <Loading></Loading>
  // }
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

          {/* Search */}
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
                onChange={(e) => {
                  setSearchText(e.target.value);
                  setPage(1);
                }}
                placeholder="Search"
              />
              
            </label>

            <select
              defaultValue="Server location"
              className="select select-neutral"
            >
              <option disabled>Server location</option>
              <option>North America</option>
              <option>EU west</option>
              <option>South East Asia</option>
            </select>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
            {tuitions.map((tuition) => (
              <TuitionCard key={tuition._id} tuition={tuition} />
            ))}
          </div>

          {/* paganation */}
          <div className="flex justify-center items-center pb-10">
            <div className="join gap-3">
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;

                return (
                  <input
                    key={pageNumber}
                    className="join-item btn btn-square"
                    type="radio"
                    name="options"
                    aria-label={pageNumber}
                    checked={page === pageNumber}
                    onChange={() => setPage(pageNumber)}
                  />
                );
              })}
            </div>
          </div>
        </Container>
      </div>
    );
};

export default Tuitions;
