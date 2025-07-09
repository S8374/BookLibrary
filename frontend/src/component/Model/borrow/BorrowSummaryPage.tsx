import { FaSpinner, FaBook, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useGetBorrowSummaryQuery } from "../../../Redux/features/borrow/borrowApi";
import { format } from "date-fns";
import { useAuth } from "../../Provider/authProvider";

export default function BorrowSummaryPage() {
  const { data: summary, isLoading, isError } = useGetBorrowSummaryQuery();
  const { currentUser } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
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
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="max-w-md p-6 bg-white rounded-xl shadow-md text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Loading Error
          </h2>
          <p className="text-gray-600 mb-4">
            We couldn't load your borrow summary. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter to show only current user's borrows
  const userBorrows = summary?.reduce((acc: any[], item) => {
    const userBorrowsForBook = item.borrows.filter(
      (borrow: any) => borrow.userEmail === currentUser?.email
    );
    
    if (userBorrowsForBook.length > 0) {
      acc.push({
        ...item,
        borrows: userBorrowsForBook,
        totalQuantity: userBorrowsForBook.reduce(
          (sum, borrow) => sum + borrow.quantity, 0
        )
      });
    }
    return acc;
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <FaBook className="text-indigo-600" />
              My Borrowed Books
            </h1>
            <p className="text-gray-500 mt-1">
              Overview of your current and past borrows
            </p>
          </div>
          <Link
            to="/books"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FaArrowLeft />
            Back to Books
          </Link>
        </div>

        {!currentUser ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="text-indigo-500 text-5xl mb-4">🔒</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please log in to view your borrowed books
            </p>
            <Link
              to="/login"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Go to Login
            </Link>
          </div>
        ) : userBorrows?.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-md mx-auto">
            <div className="text-indigo-500 text-5xl mb-4">📚</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              No Books Borrowed
            </h2>
            <p className="text-gray-600 mb-4">
              You haven't borrowed any books yet. Explore our collection!
            </p>
            <Link
              to="/books"
              className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Browse Books
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userBorrows?.map((item) => (
              <motion.div 
                key={item.bookId}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{item.title}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-500">ISBN: {item.isbn || "N/A"}</span>
                        <span className="hidden sm:inline-block text-gray-300">•</span>
                        <span className="text-sm font-medium text-indigo-600">
                          {item.totalQuantity} {item.totalQuantity === 1 ? 'item' : 'items'} borrowed
                        </span>
                      </div>
                    </div>
                    <div className="bg-indigo-50 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      Active
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Borrow Details</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quantity
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Due Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Borrow Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {item.borrows.map((borrow: any, index: number) => {
                            const dueDate = new Date(borrow.dueDate);
                            const isOverdue = dueDate < new Date();
                            
                            return (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {borrow.quantity}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span className={isOverdue ? "text-red-600 font-medium" : ""}>
                                    {format(dueDate, 'MMM dd, yyyy')}
                                    {isOverdue && " (Overdue)"}
                                  </span>
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {format(new Date(borrow.borrowedAt), 'MMM dd, yyyy')}
                                </td>
                                <td className="px-4 py-4 whitespace-nowrap">
                                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    isOverdue 
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }`}>
                                    {isOverdue ? "Overdue" : "Active"}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}