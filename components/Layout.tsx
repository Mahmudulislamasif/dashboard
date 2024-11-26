"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  FaTachometerAlt,
  FaAngleRight,
  FaAngleDown,
  FaThLarge,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import { BiDotsHorizontal } from "react-icons/bi";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false); // Manage Dashboard submenu state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Manage Drawer visibility for mobile
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Manage sidebar collapse for large devices
  const [isHoveringSidebar, setIsHoveringSidebar] = useState(false); // Detect sidebar hover
  const pathname = usePathname(); // Get current route

  // Define dashboard routes to detect if active
  const dashboardRoutes = [
    "/dashboard/analytics",
    "/dashboard/crm",
    "/dashboard/ecommerce",
    "/dashboard/crypto",
  ];

  // Check if the current route is part of the dashboard submenu
  const isDashboardActive = dashboardRoutes.includes(pathname);

  // Initialize submenu state based on active route
  useEffect(() => {
    if (isDashboardActive) {
      setIsDashboardOpen(true); // Open submenu initially if the route is active
    }
  }, [isDashboardActive]);

  // Toggle submenu logic
  const toggleDashboardMenu = () => {
    setIsDashboardOpen((prev) => !prev); // Toggle submenu open or closed
  };

  // Close drawer when clicking outside
  const closeDrawer = () => setIsDrawerOpen(false);

  // Toggle sidebar collapse for large devices
  const toggleSidebar = () => setIsSidebarCollapsed((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Overlay for Drawer */}
      {isDrawerOpen && (
        <div
          onClick={closeDrawer}
          className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <div
        onMouseEnter={() => setIsHoveringSidebar(true)}
        onMouseLeave={() => setIsHoveringSidebar(false)}
        className={`${
          isSidebarCollapsed && !isHoveringSidebar ? "w-16" : "w-64"
        } fixed top-0 left-0 min-h-screen bg-indigo-900 text-white flex flex-col transition-all duration-300 ease-in-out z-30 ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } md:relative`}
      >
        {/* Close Button for Drawer */}
        <button
          onClick={closeDrawer}
          className="absolute top-4 right-4 text-white md:hidden"
        >
          <FaTimes className="text-2xl" />
        </button>

        {/* Brand Section */}
        <div
          className={`p-6 text-center border-b border-indigo-700 transition-all duration-300 ${
            isSidebarCollapsed && !isHoveringSidebar
              ? "opacity-0 invisible"
              : "opacity-100 visible"
          }`}
        >
          <h1 className="text-2xl font-bold tracking-wide">
            <span className="text-yellow-400">VEL</span>ZON
          </h1>
        </div>

        {/* Menu Section */}
        <div className="p-4 flex-grow">
          {/* Menu Title */}
          {(!isSidebarCollapsed || isHoveringSidebar) && (
            <h2 className="text-sm font-semibold text-indigo-300 mb-4 uppercase">
              Menu
            </h2>
          )}

          {/* Dashboards Menu */}
          <div>
            <button
              onClick={toggleDashboardMenu}
              className={`w-full flex items-center ${
                isSidebarCollapsed && !isHoveringSidebar
                  ? "justify-center"
                  : "justify-between"
              } text-left px-3 py-2 hover:bg-indigo-700 rounded-md`}
            >
              <div className="flex items-center gap-2">
                <FaTachometerAlt className="text-lg" />
                {(!isSidebarCollapsed || isHoveringSidebar) && (
                  <span>Dashboards</span>
                )}
              </div>
              {(!isSidebarCollapsed || isHoveringSidebar) &&
                (isDashboardOpen ? (
                  <FaAngleDown className="text-sm" />
                ) : (
                  <FaAngleRight className="text-sm" />
                ))}
            </button>

            {/* Submenu */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isDashboardOpen && (!isSidebarCollapsed || isHoveringSidebar)
                  ? "max-h-[500px]"
                  : "max-h-0"
              }`}
            >
              <div className="ml-6 mt-2 space-y-1">
                <Link
                  href="/dashboard/analytics"
                  className={`flex items-center gap-2 text-indigo-300 hover:text-white ${
                    pathname === "/dashboard/analytics" ? "text-white" : ""
                  }`}
                >
                  <BiDotsHorizontal className="text-lg" />
                  <span>Analytics</span>
                </Link>
                <Link
                  href="/dashboard/crm"
                  className={`flex items-center gap-2 text-indigo-300 hover:text-white ${
                    pathname === "/dashboard/crm" ? "text-white" : ""
                  }`}
                >
                  <BiDotsHorizontal className="text-lg" />
                  <span>CRM</span>
                </Link>
                <Link
                  href="/dashboard/ecommerce"
                  className={`flex items-center gap-2 text-indigo-300 hover:text-white ${
                    pathname === "/dashboard/ecommerce" ? "text-white" : ""
                  }`}
                >
                  <BiDotsHorizontal className="text-lg" />
                  <span>Ecommerce</span>
                </Link>
                <Link
                  href="/dashboard/crypto"
                  className={`flex items-center gap-2 text-indigo-300 hover:text-white ${
                    pathname === "/dashboard/crypto" ? "text-white" : ""
                  }`}
                >
                  <BiDotsHorizontal className="text-lg" />
                  <span>Crypto</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Apps Menu */}
          <div className="mt-4">
            <Link
              href="/apps"
              className={`flex items-center ${
                isSidebarCollapsed && !isHoveringSidebar
                  ? "justify-center"
                  : "justify-between"
              } text-left px-3 py-2 hover:bg-indigo-700 rounded-md`}
            >
              <div className="flex items-center gap-2">
                <FaThLarge className="text-lg" />
                {(!isSidebarCollapsed || isHoveringSidebar) && <span>Apps</span>}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="sticky top-0 z-20 bg-white shadow-md p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Dashboard</h2>

          {/* Toggle Sidebar Button for Large Devices */}
          <button
            onClick={toggleSidebar}
            className="text-gray-800 hidden md:block"
          >
            <FaBars className="text-lg" />
          </button>

          {/* Hamburger Menu for Small Devices */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="text-gray-800 md:hidden"
          >
            <FaThLarge className="text-lg" />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-grow p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
