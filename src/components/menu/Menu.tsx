import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Gin", path: "/gin" },
  { name: "Vodka", path: "/vodka" },
  { name: "Rum", path: "/rum" },
  { name: "Scotch", path: "/scotch" },
  { name: "Alkoholfrei", path: "/alkoholfrei" },
  { name: "Zufall", path: "/zufall" },
];

export default function NavBar({ isOpen, closeMenu }: { isOpen: boolean; closeMenu: () => void }) {
  const location = useLocation();

  const menuVariants = {
    hidden: { opacity: 0, x: "-100%" },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: "-100%" },
  };

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden md:flex justify-center gap-10 bg-black text-white py-4">
        {navLinks.map((link) => (
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

      {/* Mobile Slide-in Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="md:hidden fixed top-16 left-0 w-3/4 h-full bg-black text-white p-6 z-40 shadow-lg"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`text-lg hover:text-blue-300 ${
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
    </>
  );
}
