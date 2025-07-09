import { useGetBorrowSummaryQuery } from "../../../Redux/features/borrow/borrowApi";
import { FaBook, FaCalendarAlt, FaUser, FaSpinner } from "react-icons/fa";
import { motion } from "framer-motion";

export default function BorrowBook() {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
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

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading borrow summary. Please try again later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaBook className="mr-3 text-indigo-600" />
            Borrow Summary
          </h1>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200">
            <p className="text-sm text-gray-600">
              Total Borrows: <span className="font-bold text-indigo-600">{summary?.length || 0}</span>
            </p>
          </div>
        </div>

        {summary && summary.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {summary.map((borrow) => (
              <motion.div 
                key={borrow._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                      {borrow.title}
                    </h2>
                    <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full">
                      {borrow.totalQuantity} {borrow.totalQuantity === 1 ? 'copy' : 'copies'}
                    </span>
                  </div>
                  
                  <div className="mt-4 space-y-3">
                    {borrow.borrows.map((item, index) => (
                      <div key={index} className="border-t border-gray-100 pt-3">
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <FaUser className="mr-2 text-indigo-500" />
                          <span className="truncate">{item.userEmail}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <FaCalendarAlt className="mr-2 text-indigo-500" />
                          <span>Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">
                            Borrowed: {new Date(item.borrowedAt).toLocaleDateString()}
                          </span>
                          <span className="font-medium">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No Borrow Records</h3>
            <p className="text-gray-500">There are currently no borrowed books in the system.</p>
          </div>
        )}
      </div>
    </div>
  );
}