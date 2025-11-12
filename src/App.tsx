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
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true); // capture phase
    return () => document.removeEventListener("mousedown", handleClickOutside, true);
  }, []);

  // Close sidebar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isSidebarOpen) closeSidebar();
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isSidebarOpen]);

  return (
    <Router>
      {/* Sidebar */}
      <div ref={sidebarRef}>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          closeSidebar={closeSidebar}
        />
      </div>

      {/* Routes */}
      <Routes>
        {/* Homepage with slider independent of sidebar */}
        <Route
          path="/"
          element={
            <>
              <Home /> {/* Slider stays full width and independent */}
              {/* Optional: Homepage content below slider */}
              <main className="home-content">
                {/* Your homepage sections */}
              </main>
            </>
          }
        />

        {/* Other pages that adjust with sidebar */}
        <Route
          path="/AboutUs"
          element={
            <main
              className="content"
              style={{
                marginLeft: isSidebarOpen ? 200 : 70,
                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
              }}
            >
              <AboutUs />
            </main>
          }
        />
        <Route
          path="/Portfolio"
          element={
            <main
              className="content"
              style={{
                marginLeft: isSidebarOpen ? 200 : 70,
                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
              }}
            >
              <Portfolio />
            </main>
          }
        />
        <Route
          path="/Careers"
          element={
            <main
              className="content"
              style={{
                marginLeft: isSidebarOpen ? 200 : 70,
                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
              }}
            >
              <Careers />
            </main>
          }
        />
        <Route
          path="/Videos"
          element={
            <main
              className="content"
              style={{
                marginLeft: isSidebarOpen ? 200 : 70,
                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
              }}
            >
              <Videos />
            </main>
          }
        />
        <Route
          path="/ContactUs"
          element={
            <main
              className="content"
              style={{
                marginLeft: isSidebarOpen ? 200 : 70,
                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
              }}
            >
              <ContactUs />
            </main>
          }
        />
        <Route
          path="/Portal"
          element={
            <main
              className="content"
              style={{
                marginLeft: isSidebarOpen ? 200 : 70,
                width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
              }}
            >
              <Portal />
            </main>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
