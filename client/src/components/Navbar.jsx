import { Link, useLocation } from "react-router-dom";
import ProfileCard from "./ProfileCard";

export default function Navbar() {
  const token = localStorage.getItem("token");
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  return (
    <header className="
      fixed top-0 left-0 right-0 z-50 h-16
      bg-gray-900/95 backdrop-blur-md
      border-b border-gray-800
      shadow-lg
    ">
      <div className="
        max-w-7xl mx-auto h-full
        px-4 sm:px-6
        flex items-center justify-between
      ">
        
        {/* Logo */}
        <Link
          to={token ? "/dashboard" : "/login"}
          className="
            text-lg sm:text-xl font-semibold
            bg-gradient-to-r from-blue-400 to-indigo-500
            bg-clip-text text-transparent
            tracking-wide
          "
        >
          TaskApp
        </Link>

        {/* Right Section */}
        {token && !isAuthPage ? (
          <div className="flex items-center gap-3">

            {/* Profile Card (desktop only) */}
            <ProfileCard />

            {/* Mobile Avatar */}
            <div className="
              sm:hidden w-8 h-8 rounded-full
              bg-blue-600 flex items-center justify-center
              text-sm font-semibold text-white
            ">
              U
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="
                px-3 py-1.5 text-sm font-medium
                bg-red-500 rounded-md
                transition-all duration-200
                hover:bg-red-600 hover:shadow-md
                active:scale-95
              "
            >
              Logout
            </button>
          </div>
        ) : null}

      </div>
    </header>
  );
}
