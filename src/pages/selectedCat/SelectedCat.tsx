import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mainContext } from "../../context/MainProvider";
import Search from "../../components/search/Search";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

interface IItems {
  strDrink: string;
  strDrinkThumb: string;
  idDrink: number;
  strInstructions: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
}

const colors = [
  'bg-blue-300',
  'bg-violet-400',
  'bg-red-300',
  'bg-orange-300',
  'bg-indigo-300',
  'bg-green-300',
];

const getIngredients = (item: IItems) => {
  const ingredients: string[] = [];
  for (let i = 1; i <= 10; i++) {
    const ingredient = item[`strIngredient${i}` as keyof IItems];
    if (typeof ingredient === 'string') ingredients.push(ingredient);
  }
  return ingredients;
};

interface ModalProps {
  cocktail: IItems | null;
  onClose: () => void;
}

const CocktailModal = ({ cocktail, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {cocktail && (
        <motion.div
          className="fixed inset-0 z-50 backdrop-blur-sm bg-black/40 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white p-8 rounded-2xl w-full max-w-3xl shadow-xl text-black"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "tween", stiffness: 200 }}
          >
            <div className="flex flex-col md:flex-row gap-10">
              <img
                className="w-full md:w-1/2 rounded-xl"
                src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink}
              />
              <article className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{cocktail.strDrink}</h2>
                  <h3 className="text-xl font-semibold mb-2">Zutaten:</h3>
                  <ul className="list-disc pl-5 mb-4 text-lg space-y-1">
                    {getIngredients(cocktail).map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-700">{cocktail.strInstructions}</p>
                </div>
              </article>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition"
              >
                Schließen
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function SelectedCat() {
  const { linkParam } = useParams();
  const { items, setLink } = useContext(mainContext) as any;

  const [selectedCocktail, setSelectedCocktail] = useState<IItems | null>(null);

  useEffect(() => {
    if (linkParam) {
      setLink(linkParam);
    }
  }, [linkParam]);

  const handleCocktailClick = async (item: IItems) => {
    try {
      const resp = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item.idDrink}`);
      const fullDetails = resp.data.drinks[0];
      setSelectedCocktail(fullDetails);
    } catch (error) {
      console.error("Fehler beim Laden der Cocktail-Details", error);
    }
  };

  const closeModal = () => {
    setSelectedCocktail(null);
  };

  return (
    <>
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-20">
        {items.map((item: IItems, index: number) => {
          const backgroundColor = colors[index % colors.length];

          return (
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200 }}
              key={item.idDrink}
              className={`flex items-center justify-between p-6 rounded-2xl shadow-md cursor-pointer ${backgroundColor}`}
              onClick={() => handleCocktailClick(item)}
            >
              <img className="w-1/2 rounded-xl" src={item.strDrinkThumb} alt={item.strDrink} />
              <div className="text-right w-1/2 text-white font-semibold text-xl rotate-[270deg] md:rotate-0">
                <p>{item.strDrink}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
      <CocktailModal cocktail={selectedCocktail} onClose={closeModal} />
    </>
  );
}
