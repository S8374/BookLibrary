import { useGetBooksQuery } from "../../../Redux/features/book/bookSlice";
import { FaStar, FaRegStar, FaSpinner } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Custom Star Rating Component
const StarRating = ({ rating = 0 }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStar key="half" className="text-yellow-500 opacity-70" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
      ))}
      <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
    </div>
  );
};

export default function BookDiscover() {
  const { data, isLoading, isFetching } = useGetBooksQuery();
  const [activeTab, setActiveTab] = useState("popular");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  // Extract unique categories from books
  const categories = [
    "all",
    ...new Set(data?.data?.map((book) => book.category)),
  ].filter(Boolean);

  // Filter books based on active tab and category
  const getFilteredBooks = () => {
    if (!data?.data) return [];

    let filteredBooks = [...data.data];

    // Apply category filter
    if (selectedCategory !== "all") {
      filteredBooks = filteredBooks.filter(
        (book) => book.category === selectedCategory
      );
    }

    // Apply tab-specific filters
    if (activeTab === "new") {
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);

      return filteredBooks
        .filter((book) => new Date(book.createdAt) > oneDayAgo)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (activeTab === "popular") {
      return filteredBooks.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filteredBooks;
  };

  // Get current books for pagination
  const filteredBooks = getFilteredBooks();
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedCategory]);

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-screen">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-blue-500 text-4xl"
          >
            <FaSpinner />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-5 py-8">
      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
      >
        <div className="tabs tabs-boxed bg-white shadow-sm">
          <button
            className={`tab mr-2.5 ${
              activeTab === "popular"
                ? "tab-active border border-black text-red-500"
                : " text-black"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              Popular Books
            </span>
          </button>
          <button
            className={`tab ${
              activeTab === "new"
                ? "tab-active border border-black text-orange-400"
                : ""
            }`}
            onClick={() => setActiveTab("new")}
          >
            <span className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                  clipRule="evenodd"
                />
              </svg>
              New Releases
            </span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="form-control w-full md:w-64">
          <label className="label">
            <span className="label-text text-gray-600">Filter by Category</span>
          </label>
          <select
            className="select select-bordered border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={String(category)} value={String(category)}>
                {category === "all" ? "All Categories" : String(category)}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Loading state for filtering */}
      {isFetching && (
        <div className="flex justify-center my-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="text-blue-500 text-xl"
          >
            <FaSpinner />
          </motion.div>
        </div>
      )}

      {/* Book Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <Link to={`/details/${book._id}`} key={book._id}>
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5 }}
                className="card bg-white shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl border border-gray-100"
              >
                <figure className="relative overflow-hidden">
                  <img
                    src={
                      book.imageUrl ||
                      "https://via.placeholder.com/300x450?text=No+Image"
                    }
                    alt={book.title}
                    className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                  />
                  {activeTab === "new" && (
                    <div className="absolute top-2 left-2 bg-black text-white px-3 py-1 text-xs font-bold shadow-md">
                      NEW
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 text-xs font-bold shadow-md">
                    ${book.price.toFixed(2)}
                  </div>
                </figure>
                <div className="card-body p-4">
                  <h3 className="card-title text-sm font-medium text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{book.author}</p>
                  <div className="mt-1">
                    <StarRating rating={book.rating || 0} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="col-span-full text-center py-12"
          >
            <div className="text-gray-500 text-lg">
              No books found matching your criteria
            </div>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setActiveTab("popular");
              }}
              className="mt-4 btn btn-ghost text-blue-500"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Pagination */}
      {filteredBooks.length > booksPerPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-12"
        >
          <div className="join">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="join-item btn btn-outline border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              «
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  className={`join-item btn btn-outline border-gray-300 ${
                    currentPage === number
                      ? "btn-active bg-black text-white border-transparent"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {number}
                </button>
              )
            )}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="join-item btn btn-outline border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              »
            </button>
          </div>
        </motion.div>
      )}

      {/* Discover More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center mt-12"
      >
        <button className="bg-black text-white hover:bg-transparent hover:border hover:border-black hover:text-black hover:scale-105 active:scale-95 py-3 px-8 text-lg font-medium transition-all duration-300 shadow-lg">
          Discover More Books
        </button>
      </motion.div>
    </div>
  );
}