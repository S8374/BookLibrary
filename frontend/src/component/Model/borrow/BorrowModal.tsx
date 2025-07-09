import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaTimes, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBorrowBookMutation } from "../../../Redux/features/borrow/borrowApi";
import toast from "react-hot-toast";
import { useAuth } from "../../Provider/authProvider";
import { useGetUsersQuery } from "../../../Redux/features/user/userSlice";

interface BorrowModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookId: string;
  availableCopies: number;
  bookTitle: string;
}

export default function BorrowModal({
  isOpen,
  onClose,
  bookId,
  availableCopies,
  bookTitle,
}: BorrowModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { data } = useGetUsersQuery();
  const usersArray = Array.isArray(data?.data) ? data.data : [];
  const matchedUser = usersArray.find(
    (user) => user.email === currentUser?.email
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    if (quantity > availableCopies) {
      toast.error("Quantity cannot exceed available copies");
      return;
    }

    if (!currentUser) {
      toast.error("Please login to borrow books");
      return;
    }

    if (!matchedUser) {
      toast.error("User account not found. Please login again");
      return;
    }

    try {
      await borrowBook({
        bookId,
        quantity,
        dueDate: new Date(dueDate).toISOString(),
        userId: matchedUser._id,
        userEmail: matchedUser.email,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      onClose();
      navigate("/borrow-summary");
    } catch (error: any) {
      if (error.data?.message) {
        toast.error(error.data.message);
      } else {
        console.error("Borrow error:", error);
        toast.error("Failed to borrow book");
      }
    }
  };

  // Only disable for loading state and invalid quantity
  const isSubmitDisabled = isLoading || quantity > availableCopies;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-xl font-bold">
              Borrow "{bookTitle}"
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Copies: {availableCopies}
              </label>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                max={availableCopies}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    Math.min(
                      availableCopies,
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  )
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
              {quantity > availableCopies && (
                <p className="text-red-500 text-sm mt-1">
                  Quantity cannot exceed available copies
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-2 border border-gray-300 rounded pl-10"
                  required
                />
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
            <button
  type="submit"
  disabled={isSubmitDisabled}
  className={`px-4 py-2 text-white rounded ${
    isSubmitDisabled
      ? "bg-red-500 hover:bg-red-600"
      : "bg-blue-600 hover:bg-blue-700"
  }`}
>
  {isLoading
    ? "Processing..."
    : quantity > availableCopies
    ? "Not available"
    : "Confirm Borrow"}
</button>

            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
