import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Gin", path: "/gin" },
  { name: "Vodka", path: "/vodka" },
  { name: "Rum", path: "/rum" },
  { name: "Scotch", path: "/scotch" },
  { name: "Alkoholfrei", path: "/alkoholfrei" },
  { name: "Zufall", path: "/zufall" },
];

export default function HeaderWithNav({ isOpen, toggleMenu, closeMenu }: { isOpen: boolean, toggleMenu: () => void, closeMenu: () => void }) {
  const location = useLocation();

  return (
    <header className="bg-sky-600 text-white sticky top-0 z-50 shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <Link to="/" className="text-xl font-bold tracking-wider">DRINKS&CHILL</Link>
        <nav className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-blue-300 transition ${
                location.pathname === link.path ? "text-blue-300 font-semibold" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black text-white p-6 z-40"
          >
            <div className="flex flex-col gap-6 text-lg mt-10">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`hover:text-blue-300 ${
                    location.pathname === link.path ? "text-blue-300 font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
