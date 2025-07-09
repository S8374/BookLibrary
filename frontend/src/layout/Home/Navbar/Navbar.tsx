import { useState } from "react";
import { FiChevronDown, FiX, FiMenu, FiUser } from "react-icons/fi";
import { RiShoppingBagLine, RiDashboardLine } from "react-icons/ri";
import CartModel from "../../../component/Model/Cart/CartModel";
import { useAuth } from "../../../component/Provider/authProvider";
import { useGetUsersQuery } from "../../../Redux/features/user/userSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { currentUser, loading, logout } = useAuth();
  const { data, isLoading } = useGetUsersQuery();

  const usersArray = Array.isArray(data?.data) ? data.data : [];
  const matchedUser = usersArray.find(
    (user) => user.email === currentUser?.email
  );
  const isAdmin = matchedUser?.role === "admin";

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  if (loading || isLoading) {
    return (
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-5 h-16 flex items-center justify-end">
          <div className="animate-pulse h-8 w-8 rounded-full bg-gray-200"></div>
        </div>
      </nav>
    );
  }

  const navItems = [
    { name: "Home", href: "/" },
    {
      name: "Store",
      href: "#",
      dropdown: [
        { name: "Shop", href: "/shop" },
        { name: "Cart", href: "/cart" },
        { name: "WishList page", href: "/wishlist" },
        { name: "CheckOut", href: "/checkOut" },
      ],
    },
    {
      name: "Our Events",
      href: "#",
      dropdown: [
        { name: "Book Launches", href: "#" },
        { name: "Author Meetups", href: "#" },
        { name: "Literary Festivals", href: "#" },
      ],
    },
    {
      name: "About",
      href: "#",
      dropdown: [
        { name: "Book Launches", href: "#" },
        { name: "Author Meetups", href: "#" },
        { name: "Literary Festivals", href: "#" },
      ],
    },
    { name: "Blog", href: "#" },
  ];

  return (
    <>
      <nav className="bg-white shadow-sm relative">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 lg:px-5">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-xl font-bold text-gray-900">
                <img
                  src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/02/logo-1.png"
                  alt="BookHub Logo"
                  className="h-10"
                />
              </div>
            </div>

            {/* Navigation and User Controls */}
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <div className="hidden md:ml-10 md:flex md:items-center text-xl mr-4">
                {navItems.map((item) => (
                  <div key={item.name} className="relative">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                        >
                          {item.name}
                          <FiChevronDown
                            className={`ml-1 h-4 w-4 transition-transform ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === item.name && (
                          <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                            <div className="py-1">
                              {item.dropdown.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md font-medium"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="mr-1.5 md:block hidden">|</div>

              {/* User Controls */}
              <div className="flex items-center space-x-4">
                {/* Cart Button */}
                <button
                  onClick={toggleCart}
                  className="p-1 text-gray-700 hover:text-gray-900 relative"
                  aria-label="Shopping Cart"
                >
                  <RiShoppingBagLine className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    0
                  </span>
                </button>

                {/* User Profile */}
                {currentUser && (
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar"
                      aria-label="User Menu"
                    >
                      <div className="w-10 rounded-full">
                        {matchedUser?.avatar ? (
                          <img
                            alt="User profile"
                            src={matchedUser.avatar}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                            <FiUser className="h-5 w-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                      {isAdmin && (
                        <li>
                          <Link to="/dashboard">
                            <RiDashboardLine className="h-4 w-4" />
                            Dashboard
                          </Link>
                        </li>
                      )}
                      <li>
                        <button onClick={() => logout()}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-1 text-gray-700 hover:text-gray-900 ml-4"
                  aria-label="Mobile Menu"
                >
                  {isMobileMenuOpen ? (
                    <FiX className="h-6 w-6" />
                  ) : (
                    <FiMenu className="h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Shopping Cart Modal */}
        {isCartOpen && <CartModel toggleCart={toggleCart} />}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-white overflow-y-auto">
            <div className="max-w-7xl mx-auto px-4 pt-5 pb-12">
              <div className="flex items-center justify-between">
                <div className="text-xl font-bold text-gray-900">
                  <img
                    src="https://booklovers.ancorathemes.com/wp-content/uploads/2021/02/logo-1.png"
                    alt="BookHub Logo"
                    className="h-10"
                  />
                </div>
                <button
                  onClick={closeMobileMenu}
                  className="p-1 text-gray-700 hover:text-gray-900"
                  aria-label="Close Menu"
                >
                  <FiX className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-10">
                {navItems.map((item) => (
                  <div key={item.name} className="border-b border-gray-200">
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="flex justify-between items-center w-full py-4 text-left text-gray-700 hover:text-gray-900 text-lg font-medium"
                        >
                          {item.name}
                          <FiChevronDown
                            className={`h-5 w-5 transition-transform ${
                              openDropdown === item.name ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === item.name && (
                          <div className="pb-4 pl-4">
                            {item.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={closeMobileMenu}
                                className="block py-3 text-gray-700 hover:text-gray-900"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={closeMobileMenu}
                        className="block py-4 text-gray-700 hover:text-gray-900 text-lg font-medium"
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}