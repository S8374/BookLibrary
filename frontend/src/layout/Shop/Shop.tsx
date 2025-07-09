import { useState } from "react";
import { useGetBooksQuery } from "../../Redux/features/book/bookSlice";
import {
  FaSpinner,
  FaSearch,
  FaFilter,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Level from "../../component/Global/Levle";

export default function Shop() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("featured");
  const booksPerPage = 6;

  const { data: booksData, isLoading, isError } = useGetBooksQuery();
  const books = booksData?.data || booksData || [];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-4xl text-[#DE3241]" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500">Error loading books</h2>
        <p className="text-gray-600 mt-2">Please try again later</p>
      </div>
    );
  }

  // Extract unique authors and categories
  const authors = [...new Set(books.map((book) => book.author))];
  const categories = [...new Set(books.map((book) => book.category))];
  const formats = ["All", "Online Book", "Paper Book"];

  const toggleAuthor = (author: string) => {
    setSelectedAuthors((prev) =>
      prev.includes(author)
        ? prev.filter((a) => a !== author)
        : [...prev, author]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Sort books based on selected option
  const sortBooks = (booksToSort: any[]) => {
    switch (sortOption) {
      case "price-low":
        return [...booksToSort].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...booksToSort].sort((a, b) => b.price - a.price);
      case "newest":
        return [...booksToSort].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return booksToSort;
    }
  };

  const filteredBooks = sortBooks(
    books.filter((book) => {
      // Filter by search query
      const searchMatch =
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Filter by price range
      const priceMatch =
        book.price >= priceRange.min && book.price <= priceRange.max;

      // Filter by authors if any are selected
      const authorMatch =
        selectedAuthors.length === 0 || selectedAuthors.includes(book.author);

      // Filter by categories if any are selected
      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(book.category);

      // Filter by format
      const formatMatch =
        activeFilter === "all" ||
        (activeFilter === "online" && book.format.includes("Online Book")) ||
        (activeFilter === "paper" && book.format.includes("Paper Book"));

      return (
        searchMatch && priceMatch && authorMatch && categoryMatch && formatMatch
      );
    })
  );

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const resetFilters = () => {
    setActiveFilter("all");
    setPriceRange({ min: 0, max: 100 });
    setSelectedAuthors([]);
    setSelectedCategories([]);
    setSearchQuery("");
    setCurrentPage(1);
    setSortOption("featured");
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <section className="font-sans text-gray-800 mt-4">
      <Level
        text="Shop"
        navItems={[
          { label: "Home", path: "/" },
          { label: "Shop", path: "/shop" },
          
        ]}
      />

      {/* Hero Banner */}
      <div className="flex justify-center py-18">
        <div className="relative h-[450px] w-full max-w-[1200px] bg-[#171717]">
          <img
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Bookshelf background"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Discover Your Next Favorite Book
              </h1>
              <div className="relative max-w-md mx-auto">
                <input
                  type="text"
                  placeholder="Search books, authors..."
                  className="w-full px-4 py-3 rounded-md pl-10 focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                />
                <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filters Button */}
      <div className="lg:hidden flex justify-center mt-4">
        <button
          onClick={() => setMobileFiltersOpen(true)}
          className="flex items-center gap-2 bg-[#DE3241] text-white px-4 py-2 rounded-md"
        >
          <FaFilter /> Filters
        </button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Mobile */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50 lg:hidden">
              <div className="absolute right-0 top-0 h-full w-4/5 bg-white overflow-y-auto p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Filters</h2>
                  <button onClick={() => setMobileFiltersOpen(false)}>
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <FilterSection
                  title="Format"
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  formats={formats}
                />

                <PriceFilter
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                />

                <CheckboxFilter
                  title="Authors"
                  items={authors}
                  selectedItems={selectedAuthors}
                  toggleItem={toggleAuthor}
                />

                <CheckboxFilter
                  title="Categories"
                  items={categories}
                  selectedItems={selectedCategories}
                  toggleItem={toggleCategory}
                />

                <button
                  onClick={resetFilters}
                  className="text-[#DE3241] hover:underline mt-4"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}

          {/* Filters Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-6 pb-2 border-b">Filters</h2>

              <FilterSection
                title="Format"
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                formats={formats}
              />

              <PriceFilter
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />

              <CheckboxFilter
                title="Authors"
                items={authors}
                selectedItems={selectedAuthors}
                toggleItem={toggleAuthor}
              />

              <CheckboxFilter
                title="Categories"
                items={categories}
                selectedItems={selectedCategories}
                toggleItem={toggleCategory}
              />

              <button
                onClick={resetFilters}
                className="text-[#DE3241] hover:underline mt-4"
              >
                Reset All Filters
              </button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Book Collection</h2>
                <p className="text-gray-600 mt-2">
                  Showing {indexOfFirstBook + 1}-
                  {Math.min(indexOfLastBook, filteredBooks.length)} of{" "}
                  {filteredBooks.length} books
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-[#DE3241] focus:border-[#DE3241]"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {currentBooks.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <nav className="flex items-center gap-1">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <FaChevronLeft />
                      </button>

                      {Array.from(
                        { length: Math.min(5, totalPages) },
                        (_, i) => {
                          // Show pages around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => paginate(pageNum)}
                              className={`px-3 py-1 rounded-md border ${
                                currentPage === pageNum
                                  ? "bg-[#DE3241] text-white border-[#DE3241]"
                                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        }
                      )}

                      <button
                        onClick={() =>
                          paginate(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-3 py-1 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <FaChevronRight />
                      </button>
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mx-auto text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-500 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-[#DE3241] hover:bg-[#C12A38] text-white px-6 py-2 rounded-md"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// Book Card Component
function BookCard({ book }: { book: any }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow h-full flex flex-col">
      <div className="relative flex-1">
        <img
          src={
            book.imageUrl || "https://via.placeholder.com/300x400?text=No+Image"
          }
          alt={book.title}
          className="w-full h-64 object-cover"
        />
        {!book.available && (
          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-lg mb-1 hover:text-[#DE3241] transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        <p className="text-gray-500 text-sm mb-3 line-clamp-2">
          {book.description}
        </p>

        <div className="mt-auto">
          <div className="flex justify-between items-center">
            <span className="font-bold text-gray-900">${book.price}</span>
            <div className="flex gap-1">
              {book.format.map((f: string, i: number) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {f}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">{book.category}</span>
            <span className="text-xs text-gray-500">{book.year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Filter Components
function FilterSection({ title, activeFilter, setActiveFilter, formats }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2">
        {formats.map((format: string) => (
          <button
            key={format}
            onClick={() =>
              setActiveFilter(
                format === "All"
                  ? "all"
                  : format === "Online Book"
                  ? "online"
                  : "paper"
              )
            }
            className={`w-full text-left px-4 py-2 rounded-md ${
              (activeFilter === "all" && format === "All") ||
              (activeFilter === "online" && format === "Online Book") ||
              (activeFilter === "paper" && format === "Paper Book")
                ? "bg-[#DE3241] text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {format}
          </button>
        ))}
      </div>
    </div>
  );
}

function PriceFilter({ priceRange, setPriceRange }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Price Range</h3>
      <div className="flex justify-between mb-2">
        <span>${priceRange.min}</span>
        <span>${priceRange.max}</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={priceRange.max}
        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
}

function CheckboxFilter({ title, items, selectedItems, toggleItem }: any) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {items.map((item: string) => (
          <label key={item} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedItems.includes(item)}
              onChange={() => toggleItem(item)}
              className="h-4 w-4 text-[#DE3241] focus:ring-[#DE3241] border-gray-300 rounded"
            />
            <span className="text-gray-700">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
