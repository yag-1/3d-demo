import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDemo from "./pages/ProductDemo";
import ScrollDemo from "./pages/ScrollDemo";

function Navigation() {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        padding: "1rem 2rem",
        background: "rgba(15, 23, 42, 0.95)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
        zIndex: 1000,
        display: "flex",
        gap: "2rem",
        alignItems: "center",
      }}
    >
      <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "#fff" }}>3D Demo</span>
      <Link to="/" style={{ textDecoration: "none", color: "#818cf8" }}>
        Product Demo
      </Link>
      <Link to="/scroll" style={{ textDecoration: "none", color: "#818cf8" }}>
        Scroll Demo
      </Link>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div style={{ paddingTop: "60px" }}>
        <Routes>
          <Route path="/" element={<ProductDemo />} />
          <Route path="/scroll" element={<ScrollDemo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
