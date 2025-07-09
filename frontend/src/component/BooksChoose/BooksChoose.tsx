import { FaArrowRightLong } from "react-icons/fa6";

const cardData = [
  {
    id: 1,
    author: "Drama",
    img: "https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&auto=format&fit=crop&w=772&q=80",
  },
  {
    id: 2,
    author: "Mystery",
    img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    author: "Novels",
    img: "https://images.unsplash.com/photo-1544717305-996b815c338c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    author: "Recipe Books",
    img: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
];

export default function BooksChoose() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-10">
        {cardData.map((card) => (
          <a
            key={card.id}
            href="#"
            className="group relative block bg-black w-full h-80 rounded overflow-hidden"
          >
            <img
              alt={card.author}
              src={card.img}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-end">
              <div>
                <p className="text-xl font-bold text-white sm:text-2xl">
                  {card.author}
                </p>

                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white flex items-center">
                    Shop Now <FaArrowRightLong className="ml-2.5" />
                  </p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="text-center items-center flex justify-center">
        <button className=" bg-black text-white hover:bg-transparent hover:border  hover:border-black hover:text-black hover:scale-105 active:scale-95 py-3 px-8  text-lg font-medium transition-all duration-300 shadow-lg">
          Discover More Category
        </button>
      </div>
    </div>
  );
}
