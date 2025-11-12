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
    document.addEventListener("mousedown", handleClickOutside, true);
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

  // Dynamic basename: use PUBLIC_URL or default to '/'
  const basename = process.env.PUBLIC_URL || "/";

  return (
    <Router basename={basename}>
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
        <Route
          path="/"
          element={
            <>
              <Home />
              <main className="home-content" />
            </>
          }
        />

        {/* Wrapper to reduce repeated style code */}
        <Route path="/AboutUs" element={<PageWrapper isSidebarOpen={isSidebarOpen}><AboutUs /></PageWrapper>} />
        <Route path="/Portfolio" element={<PageWrapper isSidebarOpen={isSidebarOpen}><Portfolio /></PageWrapper>} />
        <Route path="/Careers" element={<PageWrapper isSidebarOpen={isSidebarOpen}><Careers /></PageWrapper>} />
        <Route path="/Videos" element={<PageWrapper isSidebarOpen={isSidebarOpen}><Videos /></PageWrapper>} />
        <Route path="/ContactUs" element={<PageWrapper isSidebarOpen={isSidebarOpen}><ContactUs /></PageWrapper>} />
        <Route path="/Portal" element={<PageWrapper isSidebarOpen={isSidebarOpen}><Portal /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

// Wrapper component for pages that use sidebar
const PageWrapper = ({ isSidebarOpen, children }: { isSidebarOpen: boolean; children: React.ReactNode }) => (
  <main
    className="content"
    style={{
      marginLeft: isSidebarOpen ? 200 : 70,
      width: `calc(100% - ${isSidebarOpen ? 200 : 70}px)`,
    }}
  >
    {children}
  </main>
);

export default App;
