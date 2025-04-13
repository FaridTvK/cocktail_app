import { useState } from "react";
import { Outlet } from "react-router-dom";
import HeaderWithNav from "../components/headerWithNav/HeaderWithNav";
import Footer from "../components/footer/Footer";

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <HeaderWithNav isOpen={menuOpen} toggleMenu={toggleMenu} closeMenu={closeMenu} />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
