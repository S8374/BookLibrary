import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import { FiMinus, FiPlus } from "react-icons/fi";
import RelatedBook from "../RelatedBook/RelatedBooks";
import { useGetBookByIdQuery } from "../../../Redux/features/book/bookSlice";
import Rating from "react-rating";
import { FaStar, FaRegStar, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";
import BorrowModal from "../../Model/borrow/BorrowModal";
import TextDiscount from "../../OptionalTems/TextDiscount/TextDiscount";
import ScrollToTop from "../../../Loader/ScrollToTop";
import toast from "react-hot-toast";

export default function BookDetails() {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetBookByIdQuery(id!);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [availableCopies, setAvailableCopies] = useState(0);

  const book = response?.data;

  useEffect(() => {
    if (book?.copies) {
      setAvailableCopies(book.copies);
    }
  }, [book]);

  const handleIncrement = () => {
    if (quantity < availableCopies) {
      setQuantity((prev) => prev + 1);
    } else {
      toast.error(`Only ${availableCopies} copies available`);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleBorrowClick = () => {
    if (availableCopies > 0) {
      setIsBorrowModalOpen(true);
    } else {
      toast.error("No copies available for borrowing");
    }
  };

  const handleBuyNow = () => {
    if (availableCopies > 0) {
      toast.success(
        `Added ${quantity} ${quantity === 1 ? "copy" : "copies"} to cart`,
        {
          position: "top-right",
          duration: 3000,
        }
      );
    } else {
      toast.error("This book is currently out of stock", {
        position: "top-right",
        duration: 3000,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="text-indigo-600 text-4xl"
        >
          <FaSpinner />
        </motion.div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-xl shadow-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Book Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't find the book you're looking for.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const price = book.price || 0;
  const rating = book.rating || 0;
  const description = book.description || "No description available";
  const imageUrl =
    book.imageUrl || "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-50 min-h-screen max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-5"
      >
        <ScrollToTop />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Book Image Section */}
            <div className="w-full lg:w-1/3">
              <div className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <motion.img
                  src={imageUrl}
                  alt={book.title}
                  className="w-full h-auto max-h-[500px] object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Wishlist Button */}
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-sm transition-all ${
                    isWishlisted
                      ? "bg-red-500/90 text-white"
                      : "bg-white/80 text-gray-700 hover:bg-red-500/90 hover:text-white"
                  }`}
                  aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <CiHeart className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Book Details Section */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  by{" "}
                  <span className="text-indigo-600 font-medium">
                    {book.author}
                  </span>
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Rating
                      initialRating={rating}
                      readonly
                      emptySymbol={<FaRegStar className="text-yellow-400" />}
                      fullSymbol={<FaStar className="text-yellow-500" />}
                      fractions={2}
                    />
                    <span className="text-gray-500 ml-1">
                      ({rating.toFixed(1)})
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 text-sm font-medium rounded-full ${
                      availableCopies > 0
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {availableCopies > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                  {book.copies && (
                    <span className="text-sm text-gray-500">
                      {availableCopies}{" "}
                      {availableCopies === 1 ? "copy" : "copies"} available
                    </span>
                  )}
                </div>

                <div className="mb-6">
                  <span className="text-3xl font-bold text-indigo-600">
                    ${price.toFixed(2)}
                  </span>
                  {quantity > 1 && (
                    <span className="ml-2 text-gray-500 text-lg">
                      (${(price * quantity).toFixed(2)} total)
                    </span>
                  )}
                </div>

                <div className="prose max-w-none text-gray-700 mb-8">
                  <p className="leading-relaxed">{description}</p>
                </div>

                {/* Book Metadata Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {[
                    { label: "Publisher", value: book.publisher },
                    { label: "Year Published", value: book.year },
                    { label: "Pages", value: book.pages },
                    { label: "ISBN", value: book.isbn },
                    { label: "Category", value: book.category },
                    { label: "Format", value: book.format?.join(", ") },
                  ].map(
                    (item, index) =>
                      item.value && (
                        <div key={index} className="bg-gray-50 p-3 rounded-lg">
                          <h3 className="text-sm font-medium text-gray-500">
                            {item.label}
                          </h3>
                          <p className="text-gray-900">{item.value}</p>
                        </div>
                      )
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity <= 1}
                      className={`px-3 py-2 transition-colors ${
                        quantity <= 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                      aria-label="Decrease quantity"
                    >
                      <FiMinus />
                    </button>
                    <span className="px-4 py-2 bg-white w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={handleIncrement}
                      disabled={quantity >= availableCopies}
                      className={`px-3 py-2 transition-colors ${
                        quantity >= availableCopies
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                      aria-label="Increase quantity"
                    >
                      <FiPlus />
                    </button>
                  </div>

                  <button
                    onClick={handleBorrowClick}
                    disabled={availableCopies === 0}
                    className={`flex items-center gap-2 px-6 py-3  transition-all shadow-md ${
                      availableCopies > 0
                        ? "bg-indigo-600 text-white hover:bg-indigo-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <span>Borrow Now</span>
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={availableCopies === 0}
                    className={`flex items-center gap-2 px-6 py-3 transition-all shadow-md ${
                      availableCopies > 0
                        ? "bg-black text-white hover:bg-gray-800"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <CiShoppingCart className="text-xl" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related Books Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              You May Also Like
            </h2>
            <RelatedBook currentBookId={book._id} category={book.category} />
          </div>
        </div>

        {/* Borrow Modal */}
        <BorrowModal
          isOpen={isBorrowModalOpen}
          onClose={() => setIsBorrowModalOpen(false)}
          bookId={book._id}
          availableCopies={availableCopies}
          bookTitle={book.title}
          quantity={quantity}
        />
      </motion.div>
      <TextDiscount />
    </>
  );
}
