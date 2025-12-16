import React from "react";
import TeamCard from "./TeamCard";

const teamMembers = [
  {
    name: "Mike Jason",
    role: "Business Advisor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmro0HlpKwtj-Lv7pasUF5t-I5b7nXRb2I5sFQMuZXV7L77xFCduUA9ofwfbaMgKm8gyx8vgSHDKITeT3VrBodzd0-YidUU59iBtGBxysyyrWP1uYAe3_Fz9jhinfh8WbdInzRoIqu9prQnYCXQAJKvXbgpczo0mhsbQ4qofsaW-9s5G-_ANJH3inMzhY-OAnvg-7jddY8qSsBM2W01We80LNaavGoBGoRuJh9Lzbet1DGJBiANDGFDXlfm8Oza21nPttIjgQOBQs",
  },
  {
    name: "John Freight",
    role: "Business Advisor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCiWZ1AqKdlh1pq9XDiOtfLUz1kLhv2xzcbfRRodMOcruAeAPPaymWMWiCzaMXluqfIbrgOYVIIBEEb9H6q1E9JgveqktaPVqKLHzXEu_tD_qz4GIJogFoLYo5Xo-YLjtbBCCZqSNp_wsI9fW2LvACxeN_RH1MeZw5N6ggRy3mXHYv3Z5EOhHo3-PqanY00I8NUYIHoxF_eHuiK3pem_NO2ezFPUEg6yzcBL60lSEh9r2kZCcriNYmxakkFrkpOZNahFuQDkkL7y-Q",
  },
  {
    name: "Cory Anderson",
    role: "Business Advisor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDajS67HvaRomplKRb0JzZM38Amf0IYXdfoFnwJiVpJeHrgqLwro_f2AgOpVt6XWGRX2v4pLD4Err5IgAXeL4AH2lqbofcUKvwlHuBJ5UiN2Tzpbe5f9mv2d8l85M_pKeQonNTQc4nJxDxGZIT9I_srfC5Ti_HuJF1EwsN9HBgyr1fl8HoyJzz6FGZhiTDzQ00wGGWXuFYk9gRi2rWsXgxh2oUfuI0-u032hfc6kuDKiFMmHfqCZPzSt6lnus7e_roM8asGPZILA4o",
  },
  {
    name: "John Miliha",
    role: "Business Advisor",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB9-Q-iG41HEOPuKmci_nMNmvwgbF1dxsaGqZzTZOUh8G13PQNOv0W8OMdOwUs85aSpwlZBjrQcE_jCNPVu4z3RikD51atE2Y1VB6KCQQUho_fw4P3rc3D-BQtx7u_zvOwVl9FGdvktLSZ7UnAf_fqtI2swfVb4dgtfY-GVLOVUNOEbRz9pGc1oGVXrvktENaLcKm7QM4sgKPFHmkh3dLHjyikvEwUyzLuyzBQuOSzPIbL275nWC3DK3Rre6JlBZO0fqKDzrh_1cuc",
  },
];


const PRIMARY_COLOR = "#0288D1";

const OurTeam = () => {
  return (
    <section className="relative py-10 bg-[#F9F9F9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Header */}
        <h3
          className="font-bold text-sm uppercase tracking-wider mb-3"
          style={{ color: PRIMARY_COLOR }}
        >
          Expert People
        </h3>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Meet Our Team
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-slate-600 mb-10">
          Meet the professionals who work behind the scenes to make our platform
          reliable and efficient.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {teamMembers.map((member, index) => (
            <TeamCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};



export default OurTeam;
