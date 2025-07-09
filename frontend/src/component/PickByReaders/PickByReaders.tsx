import { useState } from 'react';
import { useGetBooksQuery } from "../../Redux/features/book/bookSlice";
import { useGetBorrowSummaryQuery } from "../../Redux/features/borrow/borrowApi";

export default function PickByReaders() {
  const { data: summary, isLoading: summaryLoading, error: summaryError } = useGetBorrowSummaryQuery();
  const { data: booksData, isLoading: booksLoading, error: booksError } = useGetBooksQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  if (summaryLoading || booksLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (summaryError || booksError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500">
          Error loading data: {summaryError?.message || booksError?.message}
        </h2>
      </div>
    );
  }

  // Ensure books is an array
  const books = booksData?.data || booksData || [];
  if (!Array.isArray(books)) {
    return (
      <div className="text-center py-8 text-red-600">
        Unexpected books data format received from API
      </div>
    );
  }

  // Process data to match books with their borrow info and remove duplicate users
  const processedBooks = summary?.reduce((acc, summaryItem) => {
    const matchedBook = books.find(book => book._id === summaryItem.bookId);
    
    if (matchedBook) {
      // Check if this book is already in our accumulator
      const existingIndex = acc.findIndex(item => item.bookId === summaryItem.bookId);
      
      if (existingIndex === -1) {
        // Group borrows by user email to avoid duplicates
        const uniqueBorrows = summaryItem.borrows.reduce((userAcc, borrow) => {
          const existingUser = userAcc.find(b => b.userEmail === borrow.userEmail);
          if (!existingUser) {
            userAcc.push(borrow);
          }
          return userAcc;
        }, []);

        acc.push({
          ...matchedBook,
          borrows: uniqueBorrows,
          totalQuantity: summaryItem.totalQuantity
        });
      }
    }
    return acc;
  }, []);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = processedBooks?.slice(indexOfFirstBook, indexOfLastBook) || [];
  const totalPages = Math.ceil((processedBooks?.length || 0) / booksPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Picked by Readers
        </h1>
        
        {!processedBooks || processedBooks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No books borrowed yet</h3>
            <p className="mt-1 text-gray-500">Check back later to see what's popular.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBooks.map((book) => (
                <div key={book._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative h-60 overflow-hidden">
                    <img
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      src={book.imageUrl || book.coverImage || "https://via.placeholder.com/300x400?text=No+Cover"}
                      alt={book.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {book.available ? 'Available' : 'Checked Out'}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">{book.title}</h2>
                        <p className="text-gray-600 mb-2">by {book.author}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {book.totalQuantity} borrows
                      </span>
                    </div>
                    
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Borrow Details</h3>
                      <div className="space-y-3">
                        {book.borrows?.slice(0, 2).map((borrow, index) => (
                          <div key={index} className="text-sm bg-gray-50 p-2 rounded-lg">
                            <p className="text-gray-600 truncate">
                              <span className="font-medium">User:</span> {borrow.userEmail || "Anonymous"}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Qty:</span> {borrow.quantity}
                            </p>
                            <p className="text-gray-600">
                              <span className="font-medium">Due:</span> {new Date(borrow.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                        {book.borrows?.length > 2 && (
                          <p className="text-xs text-gray-500">+{book.borrows.length - 2} more</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">ISBN: {book.isbn}</span>
                      <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstBook + 1}</span> to{' '}
                      <span className="font-medium">
                        {Math.min(indexOfLastBook, processedBooks.length)}
                      </span>{' '}
                      of <span className="font-medium">{processedBooks.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        &larr;
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === pageNum
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        &rarr;
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors duration-300">
                Browse All Books
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}