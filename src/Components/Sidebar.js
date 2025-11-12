import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import Logo from "./Resources/SCLogo.png";
const Sidebar = ({ isOpen, toggleSidebar, closeSidebar }) => {
    const location = useLocation();
    const sidebarRef = useRef(null);
    const menuItems = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/AboutUs" },
        { name: "Portfolio", path: "/Portfolio" },
        { name: "Employment", path: "/Careers" },
        { name: "Video Gallery", path: "/Videos" },
        { name: "Contact Us", path: "/ContactUs" },
        { name: "Tenant Portals", path: "/Portal" },
    ];
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!isOpen)
                return; // Only check when open
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };
        document.addEventListener("click", handleClickOutside, true); // Use capture phase
        return () => document.removeEventListener("click", handleClickOutside, true);
    }, [isOpen, closeSidebar]);
    return (_jsxs("aside", { ref: sidebarRef, className: `sidebar ${isOpen ? "expanded" : ""}`, children: [_jsxs("button", { className: `menu-btn ${isOpen ? "open" : ""}`, onClick: toggleSidebar, children: [_jsx("span", { className: "bar long" }), _jsx("span", { className: "bar short" })] }), _jsx("nav", { children: _jsxs("ul", { children: [_jsx("li", { className: "logo-item", children: _jsx("img", { src: Logo, alt: "Logo" }) }), menuItems.map((item) => (_jsx("li", { className: location.pathname === item.path ? "active" : "", children: _jsx(Link, { to: item.path, children: item.name }) }, item.path)))] }) }), _jsxs("div", { className: "sidebar-footer", children: [_jsx("p", { children: "info@summit.community" }), _jsx("p", { children: "13918 E Mississippi Ave #68214, Aurora CO" }), _jsx("p", { children: "(720) 278-2100" })] })] }));
};
export default Sidebar;
