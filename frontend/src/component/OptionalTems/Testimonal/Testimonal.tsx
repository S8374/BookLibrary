import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TextDiscount from "../TextDiscount/TextDiscount";

const testimonials = [
  {
    id: 1,
    name: "Emily Johnson",
    role: "Book Blogger",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    message:
      "“This platform changed how I discover books. It’s beautifully designed and easy to use.”",
    rating: 5,
  },
  {
    id: 2,
    name: "James Anderson",
    role: "Literary Critic",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    message:
      "“One of the most elegant book platforms out there. Absolutely love the user experience.”",
    rating: 4,
  },
  {
    id: 3,
    name: "Sophia Williams",
    role: "Author",
    image: "https://randomuser.me/api/portraits/women/70.jpg",
    message:
      "“A perfect space for readers and writers alike. The community here is amazing.”",
    rating: 5,
  },
];

export default function TestimonialSlider() {
  return (
    <>
      <div className="relative bg-[#f8f5f2]">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed z-0 opacity-60" style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1920&q=80')"
        }}></div>

        {/* Overlay Content */}
        <div className="relative z-10 py-20 px-4 md:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={{ clickable: true }}
              autoplay={{ delay: 6000 }}
              loop={true}
              slidesPerView={1}
              className="w-full"
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className="bg-white/80 rounded-xl shadow-xl px-6 sm:px-10 py-10 sm:py-12 mx-auto max-w-3xl">
                    <div className="text-5xl sm:text-7xl text-[#DE3241] font-serif mb-4">“</div>

                    <div className="flex justify-center mb-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white shadow-md object-cover"
                      />
                    </div>

                    <p className="text-base sm:text-lg text-gray-800 italic mb-6">
                      {item.message}
                    </p>

                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">{item.role}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <TextDiscount />
    </>
  );
}
