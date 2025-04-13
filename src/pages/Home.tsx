import Search from "../components/search/Search";
import Categories from "../components/categories/Categories";

export default function Home() {
  return (
    <>
      <section className="text-center py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold mb-6">Cocktails & Getränke!</h2>
        <p className="uppercase text-gray-600 text-lg mb-14">Herzlich Willkommen in der Welt der Cocktails!</p>
      </section>
      <Search />
      <Categories />
    </>
  );
}
