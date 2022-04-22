/**
 * Display the recipes from the api.
 */
import { React, useContext } from 'react';

// Import Link...
import { Link } from 'react-router-dom';
import api from '../Context/Api';

// Importing ContextProvider
import { RecipesContext } from '../Context/RecipesContext';
import { UserContext } from '../Context/UserStatus';

const Recipes = () => {
    const [displayedRecipes, setDisplayedRecipes] = useContext(RecipesContext);
    const { admin } = useContext(UserContext);
    const imageFolderPath = "https://my135.brighton.domains/storage/";

    const deleteRecipe = (id) => {
        api().get('sanctum/csrf-cookie').then(() => { // Authenticate the request via Sanctum cookies for csrf...
            api().delete(`api/recipes/${id}`, { id })
                .then(() => {
                    setDisplayedRecipes(displayedRecipes.filter(recipe => (recipe.id !== id)));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }
    return (
        <div className="grid md:grid-cols-3 gap-5 w-11/12 mx-auto">
            {displayedRecipes.map(recipe => (
                <div id={`${recipe.id}`} key={`${recipe.id}`} className="bg-white rounded-lg overflow-hidden shadow-md  h-full" style={{ maxHeight: '600px' }}>
                    <div> <img src={`${imageFolderPath + recipe.image}`} alt={`${recipe.rName}`} className="w-full h-48 sm:h-64 object-cover" />
                    </div>
                    <div className="m-4">
                        <h2 className="text-xl">{recipe.rName}</h2>
                        <p className="block mb-4">{recipe.description}</p>
                        <Link to={`/recipes/${recipe.id}`}
                            className="py-2 px-4 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500"
                        >Learn...
                        </Link>
                        {admin ? <a onClick={() => (deleteRecipe(recipe.id))} className="ml-4 text-blue-500 hover:text-red-400 cursor-pointer">Delete</a> : ""}
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Recipes;