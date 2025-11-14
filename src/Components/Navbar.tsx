import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import IMG from "./Resources/SCLogo.png";
import "./Navbar.css";

interface NavbarProps {
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

const Navbar: React.FC<NavbarProps> = ({ isOpen, toggleSidebar, closeSidebar }) => {
    const location = useLocation();
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Scroll state
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScroll, setLastScroll] = useState(0);

    // Handle menu open/close animation
    useEffect(() => {
        if (isOpen) {
            setIsTransitioning(true);
        } else {
            const timeout = setTimeout(() => setIsTransitioning(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Handle scroll to hide/show navbar
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;

            if (currentScroll <= 0) {
                setShowNavbar(true); // always show at top
            } else if (currentScroll > lastScroll) {
                setShowNavbar(false); // scrolling down
            } else if (currentScroll < lastScroll) {
                setShowNavbar(true); // scrolling up
            }

            setLastScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScroll]);

    return (
        <header className={`navbar-header ${showNavbar ? 'visible' : 'hidden'}`}>
            <nav className="navbar-nav">
                <div className="navbar-logo-container">
                    <img src={IMG} alt="SC Logo" className="navbar-logo" />
                </div>

                {/* Menu Button */}
                <button 
                    className={`menu-button ${isOpen ? 'open' : ''}`}
                    onClick={toggleSidebar}
                    aria-expanded={isOpen}
                    aria-controls="mobile-menu"
                />
            </nav>

            {isTransitioning && (
                <div 
                    id="mobile-menu"
                    className={`dropdown-menu ${isOpen ? 'open' : ''}`}
                >
                    <ul className="menu-list">
                        {menuItems.map(item => {
                            const isActive = location.pathname === item.path;
                            return (
                                <li 
                                    key={item.path} 
                                    className={`nav-item ${isActive ? 'active' : ''}`}
                                >
                                    <Link 
                                        to={item.path} 
                                        onClick={closeSidebar} 
                                        className="nav-link"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;
