import { Link } from "react-router-dom";

const categories = [
  { name: "Gin", color: "bg-blue-400", path: "/gin" },
  { name: "Vodka", color: "bg-purple-400", path: "/vodka" },
  { name: "Rum", color: "bg-red-400", path: "/rum" },
  { name: "Scotch", color: "bg-amber-400", path: "/scotch" },
  { name: "Alkoholfrei", color: "bg-lime-400", path: "/alkoholfrei" },
  { name: "Zufall", color: "bg-emerald-400", path: "/zufall" },
];

export default function Categories() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
      {categories.map(({ name, color, path }) => (
        <Link key={name} to={path}>
          <div className={`${color} h-60 md:h-72 lg:h-80 flex flex-col justify-center items-start p-8 rounded-2xl hover:scale-[1.02] transition cursor-pointer shadow-md`}>
            <h3 className="text-4xl font-bold mb-2 text-white">{name}</h3>
            <p className="uppercase text-white tracking-wide">Find your favorite cocktail</p>
          </div>
        </Link>
      ))}
    </section>
  );
}
