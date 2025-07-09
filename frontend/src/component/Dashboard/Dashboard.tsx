import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiBook,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiShoppingCart,
  FiBell,
  FiSearch,
  FiMenu,
  FiChevronDown,
  FiPlus,
  FiTrendingUp,
  FiDollarSign,
  FiBookmark,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { useAuth } from "../Provider/authProvider";
import { useGetUsersQuery } from "../../Redux/features/user/userSlice";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();
  const { isLoading, data, isError } = useGetUsersQuery();
  const usersArray = Array.isArray(data?.data) ? data.data : [];

  console.log(data);
  const matchedUser = usersArray.find(
    (user) => user.email === currentUser?.email
  );

  console.log(usersArray, matchedUser);
  useEffect(() => {
    if (!loading && matchedUser && matchedUser.role !== "admin") {
      navigate("/"); // redirect to homepage if not admin
    }
  }, [matchedUser, loading]);
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Mobile Header */}
      <header className="md:hidden bg-white shadow-lg p-4 flex justify-between items-center sticky top-0 z-20">
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="text-gray-600 hover:text-[#6366f1]"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-bold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
          BookVerse Admin
        </h1>
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-600 hover:text-[#6366f1]">
            <FiBell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>
      </header>

      {/* Sidebar - Mobile */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <aside className="fixed left-0 top-0 bottom-0 w-72 bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white p-6 transform transition-transform z-50 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#a5b4fc] to-[#c7d2fe] bg-clip-text text-transparent">
                BookVerse
              </h2>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiMenu size={24} />
              </button>
            </div>
            <DashboardNav collapsed={undefined} />
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg">
                <FiPlus />
                <span>New Project</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Sidebar - Desktop */}
      <aside
        className={`hidden md:flex flex-col ${
          sidebarOpen ? "w-72" : "w-20"
        } bg-gradient-to-b from-[#1e1b4b] to-[#312e81] text-white transition-all duration-300 shadow-2xl`}
      >
        <div className="p-6 flex justify-between items-center">
          {sidebarOpen ? (
            <h2 className="text-xl font-bold bg-gradient-to-r from-[#a5b4fc] to-[#c7d2fe] bg-clip-text text-transparent">
              BookVerse
            </h2>
          ) : (
            <div className="w-8 h-8 bg-[#6366f1] rounded-full flex items-center justify-center text-white font-bold">
              BV
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <FiMenu size={20} />
          </button>
        </div>
        <DashboardNav collapsed={!sidebarOpen} />
        <div className="mt-auto p-6">
          {sidebarOpen ? (
            <button className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white py-3 px-4 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg">
              <FiPlus />
              <span>New Project</span>
            </button>
          ) : (
            <button className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white p-3 rounded-xl flex items-center justify-center transition-all shadow-lg">
              <FiPlus />
            </button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white shadow-lg p-4 justify-between items-center sticky top-0 z-10">
          <div className="flex items-center">
            <div className="relative max-w-md w-full">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books, users, orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="relative text-gray-600 hover:text-[#6366f1] p-2 rounded-full hover:bg-gray-100">
              <FiBell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full flex items-center justify-center text-white font-medium">
                  JD
                </div>
                {sidebarOpen && (
                  <div className="flex items-center">
                    <span className="font-medium text-gray-700 group-hover:text-[#6366f1]">
                      John Doe
                    </span>
                    <FiChevronDown
                      className={`ml-1 transition-transform ${
                        userDropdownOpen ? "transform rotate-180" : ""
                      } text-gray-500 group-hover:text-[#6366f1]`}
                    />
                  </div>
                )}
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50 border border-gray-100">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {/* Stats Cards */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <StatCard 
              title="Total Books" 
              value="1,248" 
              change="+12.5%" 
              icon={<FiBook size={24} />}
              color="from-[#6366f1] to-[#8b5cf6]"
            />
            <StatCard 
              title="Active Users" 
              value="856" 
              change="+8.2%" 
              icon={<FiUsers size={24} />}
              color="from-[#10b981] to-[#34d399]"
            />
            <StatCard 
              title="Monthly Sales" 
              value="$24,568" 
              change="+15.3%" 
              icon={<FiDollarSign size={24} />}
              color="from-[#f59e0b] to-[#fbbf24]"
            />
            <StatCard 
              title="New Orders" 
              value="124" 
              change="+4.7%" 
              icon={<FiShoppingCart size={24} />}
              color="from-[#ec4899] to-[#f472b6]"
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Sales Overview</h3>
                <select className="border border-gray-200 rounded-xl px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366f1]">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
                <p className="text-gray-400">Sales chart will appear here</p>
              </div>
            </div>
            
           
          </div> */}

          <Outlet />
        </main>
      </div>
    </div>
  );
}

function DashboardNav({ collapsed }) {
  return (
    <nav className="space-y-1">
     
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex items-center p-3 rounded-xl transition-all ${
            isActive
              ? "bg-[#4f46e5] text-white shadow-md"
              : "text-gray-300 hover:bg-[#4338ca] hover:text-white"
          }`
        }
      >
        <FiBook size={20} />
        {!collapsed && <span className="ml-3">Add Book</span>}
      </NavLink>

      <NavLink
        to="/dashboard/editBook"
        className={({ isActive }) =>
          `flex items-center p-3 rounded-xl transition-all ${
            isActive
              ? "bg-[#4f46e5] text-white shadow-md"
              : "text-gray-300 hover:bg-[#4338ca] hover:text-white"
          }`
        }
      >
        <FiUsers size={20} />
        {!collapsed && <span className="ml-3">Edit Book</span>}
      </NavLink>

      <NavLink
        to="/dashboard/borrowBook"
        className={({ isActive }) =>
          `flex items-center p-3 rounded-xl transition-all ${
            isActive
              ? "bg-[#4f46e5] text-white shadow-md"
              : "text-gray-300 hover:bg-[#4338ca] hover:text-white"
          }`
        }
      >
        <FiPieChart size={20} />
        {!collapsed && <span className="ml-3">Borrow Book</span>}
      </NavLink>
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex items-center p-3 rounded-xl transition-all ${
            isActive
              ? "bg-[#4f46e5] text-white shadow-md"
              : "text-gray-300 hover:bg-[#4338ca] hover:text-white"
          }`
        }
      >
        <FiSettings size={20} />
        {!collapsed && <span className="ml-3">Home</span>}
      </NavLink>
    </nav>
  );
}

function StatCard({ title, value, change, icon, color }) {
  const isPositive = change.startsWith("+");

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm">
      <div className="flex justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p
            className={`text-sm mt-1 ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {change} {isPositive ? "↑" : "↓"}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center text-white`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
