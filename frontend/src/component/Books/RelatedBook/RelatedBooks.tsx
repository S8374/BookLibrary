import { useGetBooksQuery } from "../../../Redux/features/book/bookSlice";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function RelatedBooks({ currentBookId, category }: { currentBookId: string; category: string }) {
  const { data, isLoading, isError } = useGetBooksQuery();

  if (isLoading) return <div className="text-center py-4 text-gray-500">Loading related books...</div>;
  if (isError) return <div className="text-center py-4 text-red-500">Failed to load related books.</div>;

  const books = data?.data || [];

  const relatedBooks = books
    .filter((book) => book._id !== currentBookId && book.category === category)
    .slice(0, 4); // limit to 4 books

  if (relatedBooks.length === 0) {
    return <p className="text-gray-500">No related books found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {relatedBooks.map((book) => (
        <div
          key={book._id}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
        >
          <Link to={`/details/${book._id}`}>
            <img
              src={book.imageUrl || "https://via.placeholder.com/300x400?text=No+Image"}
              alt={book.title}
              className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div className="p-4">
            <h3 className="text-md font-semibold text-gray-800 line-clamp-1">{book.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-1">by {book.author}</p>

            <div className="flex items-center gap-1 mt-2">
              <Rating
                initialRating={book.rating || 0}
                readonly
                emptySymbol={<FaRegStar className="text-yellow-400" />}
                fullSymbol={<FaStar className="text-yellow-500" />}
              />
              <span className="text-xs text-gray-500">({book.rating?.toFixed(1) || "0"})</span>
            </div>

            <p className="text-sm text-indigo-600 font-semibold mt-2">
              ${book.price?.toFixed(2) || "Free"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
