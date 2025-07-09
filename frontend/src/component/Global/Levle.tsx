import { FiChevronRight } from "react-icons/fi";

interface NavItem {
  label: string;
  path: string;
}

interface LevelProps {
  text: string;
  navItems: NavItem[];
}

export default function Level({ text, navItems }: LevelProps) {
  return (
    <div className="h-56 bg-black flex items-center justify-center px-4">
      <div className="text-center text-white space-y-4 max-w-screen-md w-full">
        <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold">{text}</h1>

        <div className="text-xs sm:text-sm flex justify-center items-center flex-wrap gap-1 sm:gap-2">
          {navItems.map((item, index) => (
            <div key={index} className="flex items-center gap-1">
              <a href={item.path} className="hover:underline text-gray-300 whitespace-nowrap">
                {item.label}
              </a>
              {index < navItems.length - 1 && (
                <FiChevronRight className="text-gray-400 text-xs" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
