import { faCartShopping, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
export default function Sidebar() {
  const role = localStorage.getItem("role");
  return (
    <>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#250f4f]  border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-[#250f4f] dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {role === "Admin" && (
              <li>
                <Link
                  to="/List"
                  className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:text-gray-50 hover:bg-[#432b73] dark:hover:bg-[#432b73] group"
                >
                  <FontAwesomeIcon icon={faUser} className="text-white" />
                  <span className="ms-3">Users</span>
                </Link>
              </li>
            )}
            {role !== "Admin" && (
              <li>
                <Link
                  to="/Product"
                  className="flex items-center p-2 text-gray-200 rounded-lg dark:text-white hover:text-gray-50 hover:bg-[#432b73] dark:hover:bg-[#432b73] group"
                >
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="text-white"
                  />{" "}
                  <span className="ms-3">Product</span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </aside>
    </>
  );
}
