import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header({ toggleMenu, isOpen }: { toggleMenu: () => void, isOpen: boolean }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 md:px-10 bg-white shadow-md sticky top-0 z-50">
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-widest text-black">DRINKS&CHILL</h1>
      </Link>

      {/* Mobile only */}
      <button className="md:hidden text-black" onClick={toggleMenu}>
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </header>
  );
}
