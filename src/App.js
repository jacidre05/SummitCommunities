import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Portfolio from "./Pages/Portfolio";
import Careers from "./Pages/Careers";
import Videos from "./Pages/Videos";
import ContactUs from "./Pages/ContactUs";
import Portal from "./Pages/Portals";
function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);
    // Close sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                closeSidebar();
            }
        };
        document.addEventListener("mousedown", handleClickOutside, true); // capture phase
        return () => document.removeEventListener("mousedown", handleClickOutside, true);
    }, []);
    // Close sidebar on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (isSidebarOpen)
                closeSidebar();
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSidebarOpen]);
    return (_jsxs(Router, { children: [_jsx("div", { ref: sidebarRef, children: _jsx(Sidebar, { isOpen: isSidebarOpen, toggleSidebar: toggleSidebar, closeSidebar: closeSidebar }) }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsxs(_Fragment, { children: [_jsx(Home, {}), " ", _jsx("main", { className: "home-content" })] }) }), _jsx(Route, { path: "/AboutUs", element: _jsx("main", { className: "content", style: {
                                marginLeft: isSidebarOpen ? 200 : 70,
                                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
                            }, children: _jsx(AboutUs, {}) }) }), _jsx(Route, { path: "/Portfolio", element: _jsx("main", { className: "content", style: {
                                marginLeft: isSidebarOpen ? 200 : 70,
                                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
                            }, children: _jsx(Portfolio, {}) }) }), _jsx(Route, { path: "/Careers", element: _jsx("main", { className: "content", style: {
                                marginLeft: isSidebarOpen ? 200 : 70,
                                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
                            }, children: _jsx(Careers, {}) }) }), _jsx(Route, { path: "/Videos", element: _jsx("main", { className: "content", style: {
                                marginLeft: isSidebarOpen ? 200 : 70,
                                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
                            }, children: _jsx(Videos, {}) }) }), _jsx(Route, { path: "/ContactUs", element: _jsx("main", { className: "content", style: {
                                marginLeft: isSidebarOpen ? 200 : 70,
                                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
                            }, children: _jsx(ContactUs, {}) }) }), _jsx(Route, { path: "/Portal", element: _jsx("main", { className: "content", style: {
                                marginLeft: isSidebarOpen ? 200 : 70,
                                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
                            }, children: _jsx(Portal, {}) }) })] })] }));
}
export default App;
