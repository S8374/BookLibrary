
import { Link } from 'react-router-dom';
import { useDeleteBookMutation, useGetBooksQuery } from '../../../Redux/features/book/bookSlice';

const BookList = () => {
  const { data, isLoading, isError } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();
  const books = data?.data;
console.log(books)
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await deleteBook(id).unwrap();
      } catch (err) {
        console.error('Failed to delete book:', err);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading books</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Book List</h1>
        <Link
          to="/dashboard"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add New Book
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book) => (
          <div key={book._id} className="border rounded-lg p-4 shadow-md">
            <img
              src={book.imageUrl}
              alt={book.title}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="text-gray-600 mb-1">by {book.author}</p>
            <p className="text-gray-800 mb-2">${book.price.toFixed(2)}</p>
            
            <div className="flex justify-between mt-4">
              <Link
                to={`/books/edit/${book._id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(book._id!)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;