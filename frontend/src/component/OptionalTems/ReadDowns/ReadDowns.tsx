import { FaArrowRightLong } from "react-icons/fa6";

const cardData = [
  {
    id: 1,
    title: "20 Books",
    subtitle: "to Help You Bring up child",
    img: "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=2574&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Top Picks",
    subtitle: "Books that everyone is reading",
    img: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Must Reads",
    subtitle: "Best reads of the year",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function ReadDowns() {
  return (
    <div className="max-w-[1200px] mx-auto mt-8 px-4 sm:px-6 lg:px-5 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">The ReadDown</h1>

      <div className="max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {cardData.map((card) => (
            <a
              key={card.id}
              href="#"
              className="group relative block overflow-hidden w-full max-w-xs mx-auto"
            >
              <img
                src={card.img}
                alt={card.title}
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
              />

              <div className="relative border border-gray-100 bg-white p-6 text-center">
                <h3 className="mt-1.5 text-lg font-medium text-gray-900">
                  {card.title}
                </h3>

                <p className="mt-1.5 line-clamp-3 text-gray-700">
                  {card.subtitle}
                </p>

                <div className="mt-4 flex justify-center">
                  <span className="w-full flex items-center justify-center px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105 cursor-pointer">
                    Read More <FaArrowRightLong className="ml-2.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
