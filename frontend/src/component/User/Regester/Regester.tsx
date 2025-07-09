import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import { FiUser, FiMail, FiLock, FiCheck, FiArrowRight } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { useAuth } from "../../Provider/authProvider";
import { useRegisterUserMutation } from "../../../Redux/features/user/userSlice";

interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

const inputVariants = {
  focus: {
    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.5)",
    borderColor: "#6366f1",
  },
};

export const Register = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();
  const { register: firebaseRegister } = useAuth();
  const { currentUser, loading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>();

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const { confirmPassword, agreeToTerms, ...userData } = data;
      
      // Register with Firebase
      await firebaseRegister(data.email, data.password);

      const response = await registerUser(userData).unwrap();

      if (response.success) {
        toast.success(response.message, {
          position: "top-center",
          style: {
            background: "#10b981",
            color: "#fff",
          },
        });
        setIsSuccess(true);
        reset();
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Registration failed", {
        position: "top-center",
        style: {
          background: "#ef4444",
          color: "#fff",
        },
      });
      console.error("Registration error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-white">
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

  if (currentUser || isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <FiCheck className="text-green-600 text-4xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            Welcome to our community. Your account has been created successfully.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/")}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
          >
            Continue to Dashboard <FiArrowRight />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-4">
      <div className="max-w-4xl w-full flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg">
        {/* Left Side - Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-600 to-indigo-800 p-8 text-white">
          <div className="h-full flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
              <p className="text-indigo-100 text-lg mb-8">
                Create your account and get access to exclusive features and content.
              </p>
              <ul className="space-y-3">
                {[
                  "Access to premium content",
                  "Personalized recommendations",
                  "Save your favorite books",
                  "Track your reading progress",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FiCheck className="text-green-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
              <p className="text-gray-500 mt-2">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Sign in
                </button>
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <motion.div whileFocus="focus">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        id="firstName"
                        type="text"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                          errors.firstName ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                        placeholder="John"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.firstName && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors.firstName.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <motion.div whileFocus="focus">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        id="lastName"
                        type="text"
                        {...register("lastName", { required: "Last name is required" })}
                        className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                        placeholder="Doe"
                      />
                    </div>
                    <AnimatePresence>
                      {errors.lastName && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1 text-sm text-red-600"
                        >
                          {errors.lastName.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <motion.div whileFocus="focus">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                      placeholder="your@email.com"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <motion.div whileFocus="focus">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                      placeholder="••••••••"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <motion.div whileFocus="focus">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === watch("password") || "Passwords do not match",
                      })}
                      className={`pl-10 w-full px-4 py-3 rounded-lg border ${
                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-1 focus:ring-indigo-500`}
                      placeholder="••••••••"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.confirmPassword && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.confirmPassword.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreeToTerms"
                    type="checkbox"
                    {...register("agreeToTerms", {
                      required: "You must agree to the terms and conditions",
                    })}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
                    I agree to the{" "}
                    <a href="#" className="text-indigo-600 hover:text-indigo-800">
                      Terms and Conditions
                    </a>
                  </label>
                  <AnimatePresence>
                    {errors.agreeToTerms && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-1 text-sm text-red-600"
                      >
                        {errors.agreeToTerms.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <FaSpinner className="animate-spin" /> Processing...
                  </>
                ) : (
                  "Create Account"
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};