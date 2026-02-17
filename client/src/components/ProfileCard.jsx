import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ProfileCard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    (async () => {
      try {
        const res = await axios.get("/auth/profile");
        setUser(res.data);
      } catch {
        console.log("User not logged in");
      }
    })();
  }, []);

  const initials = user?.name?.charAt(0).toUpperCase() || "U";

  // 🔹 Loading Skeleton (Navbar Fit Size)
  if (!user) {
    return (
      <div className="hidden sm:flex items-center gap-2 
      bg-gray-800 border border-gray-700 
      rounded-lg px-3 py-1.5 animate-pulse">

        <div className="w-8 h-8 rounded-full bg-gray-700"></div>

        <div className="space-y-1">
          <div className="h-2.5 w-20 bg-gray-700 rounded"></div>
          <div className="h-2.5 w-28 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="
      hidden sm:flex items-center gap-2
      bg-gray-800 border border-gray-700
      rounded-lg px-3 py-1.5
      hover:bg-gray-750
      transition-all duration-200
      shadow-sm hover:shadow-md
      max-w-[220px]
      "
    >
      {/* Avatar */}
      <div
        className="
        w-8 h-8 rounded-full
        bg-gradient-to-br from-blue-500 to-indigo-600
        flex items-center justify-center
        text-sm font-semibold text-white
        shrink-0
        "
      >
        {initials}
      </div>

      {/* User Info */}
      <div className="leading-tight overflow-hidden">
        <p className="text-sm font-medium text-gray-100 truncate">
          {user.name}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {user.email}
        </p>
      </div>
    </div>
  );
}
