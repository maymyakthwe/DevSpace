"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { logout } from "@/lib/auth-route";

export default function DropdownMenu() {
  const [popup, setPopup] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => setPopup((prev) => !prev)}
        className="rounded-full w-12 h-12 flex justify-center items-center cursor-pointer"
      >
        <EllipsisVertical size={26} />
      </div>

      {popup && (
        <div className="absolute bottom-full  right-[-50%] w-32 bg-card rounded-sm   shadow-lg">
          <button
            onClick={(e) => {
              logout()
              setPopup(false);
            }}
            className="w-full  px-4 py-2 hover:bg-slate-600/60 rounded-sm    text-center"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}