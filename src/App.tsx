import { useState, useEffect, useRef } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Navbar from "./Components/Navbar"; 
import Home from "./Pages/Home";
import AboutUs from "./Pages/AboutUs";
import Portfolio from "./Pages/Portfolio";
import Careers from "./Pages/Careers";
import Videos from "./Pages/Videos";
import ContactUs from "./Pages/ContactUs";
import Portal from "./Pages/Portal";

// Define a common mobile breakpoint
const MOBILE_BREAKPOINT = 768; 

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  // 2. New state to track if the screen is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < MOBILE_BREAKPOINT); 

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // 3. Effect to update isMobile state on window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    
    // Check size on mount
    checkMobile(); 

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup: remove event listener on unmount
    return () => window.removeEventListener("resize", checkMobile);
  }, []); // Empty dependency array means this runs only on mount and unmount

  // Close sidebar when clicking outside (still relevant for PC/Sidebar)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close on outside click if it's NOT mobile, or if the Sidebar/Navbar 
      // is being used for the current view. This ensures the logic only applies 
      // to the component currently being displayed.
      if (!isMobile && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside, true);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside, true);
  }, [isMobile]); // Re-run effect when isMobile changes

  // Close sidebar on scroll (still relevant for PC/Sidebar)
  useEffect(() => {
    const handleScroll = () => {
      if (!isMobile && isSidebarOpen) closeSidebar();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSidebarOpen, isMobile]); // Re-run effect when isSidebarOpen or isMobile changes

  return (
    <Router>
      <div ref={sidebarRef}>
        {/* 4. Conditional Rendering based on isMobile */}
        {isMobile ? (
          // Renders Navbar for mobile view (assumed to handle its own mobile menu/footer logic)
          <Navbar 
            isOpen={isSidebarOpen} // Pass relevant props for menu/state management
            toggleSidebar={toggleSidebar} 
            closeSidebar={closeSidebar} 
          />
        ) : (
          // Renders Sidebar for PC view
          <Sidebar
            isOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
            closeSidebar={closeSidebar}
          />
        )}
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Portfolio" element={<Portfolio />} />
        <Route path="/Careers" element={<Careers />} />
        <Route path="/Videos" element={<Videos />} />
        <Route path="/ContactUs" element={<ContactUs />} />
        <Route path="/Portal" element={<Portal />} />
      </Routes>
    </Router>
  );
}

export default App;