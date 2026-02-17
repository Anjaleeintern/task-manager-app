import { useState } from "react";

export default function SearchBar({ date, setDate }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className="w-full mb-4">
      <label className="block text-sm text-gray-400 mb-1">
        Search by date
      </label>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          w-full px-4 py-2 rounded-lg
          bg-gray-800 text-white border border-gray-700
          transition-all duration-300 ease-in-out
          shadow-md
          ${focused ? "shadow-xl scale-[1.02] border-blue-500" : ""}
          focus:outline-none
          
          /* responsive */
          text-sm sm:text-base
        `}
      />
    </div>
  );
}
