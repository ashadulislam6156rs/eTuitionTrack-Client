import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import Container from "./Container/Container";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Mahmuda Akter",
      role: "Mathematics Teacher",
      avatar:
        "https://i.pinimg.com/1200x/18/fe/a5/18fea5e3c59b32991274631a66188f55.jpg",
      color: "#F57C00",
      text: "eTuitionTrack has made managing my tuition classes so much easier. I can now effortlessly track all my students' information, class schedules, and payments.",
    },
    {
      name: "Rafi Hassan",
      role: "SSC Student",
      avatar:
        "https://i.pinimg.com/736x/2c/4a/4c/2c4a4cc47198765775f83fb5526dfe6c.jpg",
      color: "#0288D1",
      text: "Through this app, I can see all my class schedules, homework, and exam results in one place. Very easy and user-friendly.",
    },
    {
      name: "Farhana Begum",
      role: "Parent",
      avatar:
        "https://i.pinimg.com/736x/34/53/d5/3453d5b081adf3425a4aac9276bbb89a.jpg",
      color: "#0D47A1",
      text: "I can now check my child's tuition fees, attendance, and results easily. Communication with teachers has become simpler.",
    },
    {
      name: "Nazmul Islam",
      role: "English Teacher",
      avatar:
        "https://i.pinimg.com/736x/76/eb/eb/76ebeb3b055db2a1ecaeffbd2e916fe6.jpg",
      color: "#29B6F6",
      text: "Managing many students was hard before. Now everything is organized and automated. My workload has reduced a lot.",
    },
    {
      name: "Tasnim Ahmed",
      role: "HSC Student",
      avatar:
        "https://i.pinimg.com/1200x/87/43/f3/8743f37772dbe1d0ba731d40562f13d2.jpg",
      color: "#F57C00",
      text: "Notes, practice tests, and performance reports — everything in one place. This app helped me a lot in exam preparation.",
    },
    {
      name: "Sakib Rahman",
      role: "Physics Teacher",
      avatar:
        "https://i.pinimg.com/736x/6c/cd/64/6ccd64628f6b15ecb213592ba1ed0b74.jpg",
      color: "#0288D1",
      text: "Payment tracking, attendance, and student progress are now automatic. A must-have platform in the digital age.",
    },
  ];

  return (
    <section className="py-10 bg-[#fdf7e48e] dark:bg-gray-900">
      <Container>
        {/* Header */}
        <div className="text-center mb-7">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0D47A1] dark:text-blue-400 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Teachers, students, and parents simplifying education management
            with eTuitionTrack
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          spaceBetween={24}
          loop
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          className="h-86"
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="bg-[#F9F9F9] dark:bg-gray-800 h-70 rounded-2xl p-8 shadow-lg dark:shadow-gray-900/50 flex flex-col">
                <div className="flex items-center mb-5">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4">
                    <img
                      className="rounded-full w-13 h-13"
                      src={`${t.avatar}`}
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#0D47A1] dark:text-blue-400">
                      {t.name}
                    </h3>
                    <p className="text-sm text-[#0288D1] dark:text-blue-300">
                      {t.role}
                    </p>
                    <div className="text-yellow-400 dark:text-yellow-300 text-sm">
                      ★★★★★
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 leading-relaxed flex-grow">
                  "{t.text}"
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Custom Swiper Styles */}
      <style>{`
        .swiper-pagination-bullet {
          background: #0288D1;
          opacity: 0.4;
        }
        .swiper-pagination-bullet-active {
          background: #0D47A1;
          opacity: 1;
        }
        
        html[data-theme="dark"] .swiper-pagination-bullet {
          background: #60A5FA;
          opacity: 0.5;
        }
        html[data-theme="dark"] .swiper-pagination-bullet-active {
          background: #3B82F6;
          opacity: 1;
        }
       
      `}</style>
    </section>
  );
};

export default Testimonials;
