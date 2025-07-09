import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { useAuth } from "../../../component/Provider/authProvider";

const TopHeader = () => {
  const { currentUser } = useAuth();
  return (
    <header className="bg-[#f9f9f9] text-[#797979]  border-b border-[#e1e1e1]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-6 flex flex-col md:flex-row justify-between items-center py-3">
        {/* Left Text */}
        <div className="mb-2 md:mb-0">
          <p className="text-[#797979] text-sm hover:text-[#333] transition-colors duration-200">
            Welcome to Our Publishing House!
          </p>
        </div>

        {/* Right Section */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
          {/* Login / Register */}
          {currentUser ? (
            ""
          ) : (
            <div className="flex items-center space-x-3 pr-4 border-r border-[#e1e1e1]">
              <a
                href="/login"
                className="text-[#797979] hover:text-[#333] transition-colors duration-200"
              >
                Login
              </a>
              <span className="text-[#e1e1e1]">/</span>
              <a
                href="/register"
                className="text-red-600 hover:text-[#333] transition-colors duration-200"
              >
                Register
              </a>
            </div>
          )}

          {/* Social Icons */}
          <div className="flex items-center space-x-4 pr-4 border-r border-[#e1e1e1]">
            <a
              href="#"
              className="text-[#797979] hover:text-[#333] transition-colors duration-200"
            >
              <TiSocialFacebook size={14} />
            </a>
            <a
              href="#"
              className="text-[#797979] hover:text-[#333] transition-colors duration-200"
            >
              <FaXTwitter size={14} />
            </a>
            <a
              href="#"
              className="text-[#797979] hover:text-[#333] transition-colors duration-200"
            >
              <IoLogoInstagram size={14} />
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center space-x-2">
            <IoCallOutline size={14} className="text-[#797979]" />
            <span className="text-[#797979] hover:text-[#333] transition-colors duration-200">
              Free Call:{" "}
              <span className="text-red-600 cursor-pointer text-[18px] hover:text-[#333] font-semibold">
                123-456-7890
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
