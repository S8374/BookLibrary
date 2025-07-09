import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/Provider/authProvider';
import { useGetUsersQuery } from '../Redux/features/user/userSlice';
import { toast } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetUsersQuery();
  
  // Secure data handling
  const usersArray = Array.isArray(data) ? data : [];
  const matchedUser = usersArray.find((user) => user.email === currentUser?.email);

  useEffect(() => {
    if (!loading && !isLoading) {
      // Check if user data is loaded and auth check is complete
      if (!currentUser) {
        // No user logged in
        toast.error('You must be logged in to access this page', {
          id: 'auth-error'
        });
        navigate('/login');
        return;
      }

      if (isError || !matchedUser) {
        // Error fetching user data or user not found
        toast.error('Authentication verification failed', {
          id: 'auth-verification-error'
        });
        navigate('/');
        return;
      }

      if (matchedUser.role !== 'admin') {
        // User is not admin
        toast.error('Admin privileges required', {
          id: 'admin-privilege-error'
        });
        navigate('/');
        return;
      }
    }
  }, [currentUser, loading, isLoading, isError, matchedUser, navigate]);

  // Loading states
  if (loading || isLoading) {
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

  // Final security check before rendering children
  if (!matchedUser || matchedUser.role !== 'admin') {
    return null; // Already redirected by useEffect
  }

  return <>{children}</>;
}