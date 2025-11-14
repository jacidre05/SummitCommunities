import { useLocation, Link } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import IMG from "./Resources/SCLogo.png";
import "./Sidebar.css";

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
}

const menuItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/AboutUs" },
    { name: "Portfolio", path: "/Portfolio" },
    { name: "Employment", path: "/Careers" },
    { name: "Video Gallery", path: "/Videos" },
    { name: "Contact Us", path: "/ContactUs" },
    { name: "Tenant Portals", path: "/Portal" },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar, closeSidebar }) => {
    const location = useLocation();
    const sidebarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (!isOpen) return;

            // If click is outside sidebar AND outside menu button, close
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(target) &&
                buttonRef.current &&
                !buttonRef.current.contains(target)
            ) {
                closeSidebar();
            }
        };

        // Capture phase ensures we detect clicks before React handlers
        document.addEventListener("click", handleClickOutside, true);
        return () => document.removeEventListener("click", handleClickOutside, true);
    }, [isOpen, closeSidebar]);

    return (
        <>
            {/* Hamburger Menu Button */}
            <button
                ref={buttonRef}
                className={`menu-btn ${isOpen ? "open" : ""}`}
                onClick={toggleSidebar}
            >
                <span className="bar long"></span>
                <span className="bar short"></span>
            </button>

            {/* Sidebar */}
            <div ref={sidebarRef} className={`sidebar ${isOpen ? "expanded" : ""}`}>
                <nav>
                    <ul>
                        <li className="logo-item">
                            <img src={IMG} alt="SC Logo" />
                        </li>

                        {menuItems.map((item) => {
                            const active = location.pathname === item.path;
                            return (
                                <li key={item.path} className={active ? "active" : ""}>
                                    <Link to={item.path} onClick={closeSidebar}>
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                  info@summit.community<br />
                  13918 E Mississippi Ave #68214, Aurora, CO <br />
                  (720) 278-2100
                </div>
            </div>
        </>
    );
};

export default Sidebar;
