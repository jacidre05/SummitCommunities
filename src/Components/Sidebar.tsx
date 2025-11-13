import React, { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Logo from "./Resources/SCLogo.png";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SideBarProps> = ({ isOpen, toggleSidebar, closeSidebar }) => {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/AboutUs" },
    { name: "Portfolio", path: "/Portfolio" },
    { name: "Employment", path: "/Careers" },
    { name: "Video Gallery", path: "/Videos" },
    { name: "Contact Us", path: "/ContactUs" },
    { name: "Tenant Portal", path: "/Portal" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return;
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, [isOpen, closeSidebar]);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = () => {
      const diffX = touchEndX - touchStartX;
      if (diffX > 50) toggleSidebar(); // swipe right
      if (diffX < -50) closeSidebar(); // swipe left
      touchStartX = 0;
      touchEndX = 0;
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [toggleSidebar, closeSidebar]);

  return (
    <aside ref={sidebarRef} className={`sidebar ${isOpen ? "expanded" : ""}`}>
      <button className={`menu-btn ${isOpen ? "open" : ""}`} onClick={toggleSidebar}>
        <span className="bar long"></span>
        <span className="bar short"></span>
      </button>

      <nav>
        <ul>
          <li className="logo-item">
            <img src={Logo} alt="Logo" />
          </li>
          {menuItems.map((item) => (
            <li key={item.path} className={location.pathname === item.path ? "active" : ""}>
              <Link
                to={item.path}
                onClick={() => {
                  if (sidebarRef.current) {
                    sidebarRef.current.classList.remove("expanded"); // trigger CSS animation
                    setTimeout(() => {
                      closeSidebar(); // update React state
                    }, 300); // match CSS transition
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p>info@summit.community</p>
        <p>13918 E Mississippi Ave #68214, Aurora CO</p>
        <p>(720) 278-2100</p>
      </div>
    </aside>
  );
};

export default Sidebar;
