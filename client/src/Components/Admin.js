import React, { useContext, useState } from 'react';
import api from '../Context/Api';
import { CategoryContext } from '../Context/CategoryContext';
import { UserContext } from '../Context/UserStatus';
import { RecipesContext } from '../Context/RecipesContext';


const Admin = () => {
    {/**  Admin */ }
    const { admin } = useContext(UserContext);
    {/**  Category */ }
    const [categories, setCategoryList] = useContext(CategoryContext);
    const [newCategory, setNewCategory] = useState([]);
    {/**  Recipe */ }
    const [displayedRecipes, setDisplayedRecipes] = useContext(RecipesContext);
    const [name, setName] = useState('');
    const [image, setImage] = useState([0]);
    const [time, setTime] = useState('');
    const [showHideCategories, setShowHideCategories] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [ingredients, setIngredients] = useState([]); {/**  Array of ingredients */ }
    const [ingredient, setIngredient] = useState(''); {/**  Single ingredient */ }
    const [ingNumber, setIngNumber] = useState(0); {/**  Single ingredient */ }
    const [description, setDescription] = useState('');
    const [make, setMake] = useState('');
    {/**  Errors */ }
    const [catErrors, setCatErrors] = useState([]);
    const [errors, setErrors] = useState([]);

    const categorySubmit = (e) => {
        e.preventDefault();
        if (!admin) {
            setCatErrors("Unauthorized to create a new category");
            throw 'Unauthorized';
        }
        api().get('sanctum/csrf-cookie').then(() => {
            api().post('api/category', {
                categoryName: newCategory
            })
                .then(res => {
                    setCategoryList([...categories, { categoryName: newCategory, id: res.data.id }]);
                    if (res.data.categoryName) {
                        setCatErrors(res.data.categoryName);
                    }
                    setCatErrors(res.data.Message);
                })
                .catch(err => (
                    setCatErrors(err.response.data.categoryName)
                ));
        });
        //TODO 4) If any error, display it,
    }



    const formSubmit = (e) => {
        const fd = new FormData(); {/** The FormData is important to post media through POST requests (multipart/form-data) */ }
        fd.append('rName', name);
        fd.append('image', image);
        fd.append('description', description);
        fd.append('ingredients', ingredients);
        fd.append('howToMake', make);
        fd.append('timeToPrep', time);
        fd.append('categories_id', categoryId);
        e.preventDefault();
        if (!admin) {
            setCatErrors("Unauthorized to create a new category");
            throw 'Unauthorized';
        }

        api().get('sanctum/csrf-cookie').then(() => {
            api().post('api/recipes', fd)
                .then(res => {
                    setDisplayedRecipes([...displayedRecipes,
                    { id: res.data.id, rName: name, image: image, description: description, ingredients: ingredients, howToMake: make, timeToPrep: time, categories_id: categoryId }]);
                    if (res.data) {
                        setCatErrors(res.data);
                    }
                    setErrors(res.data.Message);
                })
                .catch(err => (
                    setCatErrors(err.response.data)
                ));
        });

        // 1) Check if Admin,
        // 2) Post the new recipe,
        // 3) update the recipes state,
        // 4) If any error, display it,
    }

    return (
        <div className="bg-indigo-50">
            <div className="container mx-auto bg-gray-50 min-h-screen border shadow-md flex flex-col">
                <div className="w-11/12 flex flex-col mx-auto mt-4 justify-center">
                    <label htmlFor="category" className="mb-2 sm:text-sm tracking-wide text-gray-700 block">category:</label>
                    <div className="my-2 grid grid-cols-3 gap-4">
                        <input
                            type="category"
                            id="category"
                            className="col-span-2 text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Enter category..."
                            maxLength="50"
                            onChange={(e) => (
                                setNewCategory(e.target.value)
                            )}
                            required />
                        <button type="Submit" onClick={categorySubmit}
                            className="col-span-1 py-2 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 ">Submit Category</button>
                    </div>
                    <div className="text-red-600 my-2 mx-auto" >{catErrors}</div>
                </div>
                <div className="border" ></div>


                <div className="w-11/12 flex flex-col mx-auto mt-4 justify-center">
                    <div className="my-2 grid grid-cols-2 gap-4">
                        <label htmlFor="name" className="sm:text-sm tracking-wide text-gray-700 block">name:</label>
                        <label htmlFor="image" className="sm:text-sm tracking-wide text-gray-700 block">file:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Enter name..."
                            maxLength="50"
                            onChange={(e) => (
                                setName(e.target.value)
                            )}
                            required />
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            onChange={(e) => {
                                return setImage(e.target.files[0]);
                            }}
                            required />


                        <label htmlFor="time" className="sm:text-sm tracking-wide text-gray-700 block">Time to make:</label>
                        <label className="sm:text-sm tracking-wide text-gray-700 block">Gategory:</label>
                        <input
                            type="text"
                            id="time"
                            name="time"
                            className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Time to prep..."
                            maxLength="5"
                            onChange={(e) => (
                                setTime(e.target.value)
                            )}
                            required />


                        <button onClick={() => (setShowHideCategories(prev => (!prev)))}
                            className="py-2 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 ">Show/Hide Categories</button>

                        {showHideCategories ? <div className="h-auto col-span-2 my-14 justify-center md:justify-start flex flex-wrap content-center">
                            <ul className="list-none md:ml-8">
                                {categories.length > 0 ? categories.map(category => (
                                    <li key={`${category.id}`}
                                        className={"inline-block mb-5 py-2 px-4 mx-2 text-blue-500 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 "} >
                                        <a onClick={() => (setCategoryId(category.id))} >{category.categoryName}</a>
                                    </li>
                                )) : ""}
                            </ul>
                        </div> : ""}
                        <label htmlFor="ingredients" className="col-span-2 sm:text-sm tracking-wide text-gray-700 block">Ingredients:</label>
                        <input
                            type="text"
                            id="ingredients"
                            name="ingredients"
                            className="text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Ingredient name..."
                            onChange={(e) => (
                                setIngredient(e.target.value)
                            )}
                            value={ingredient}
                            required />
                        <button disabled={!ingredient} onClick={() => {
                            if (ingredient !== null) {
                                setIngNumber(ingNumber + 1);
                                setIngredients([...ingredients, ingredient]);
                                setIngredient(''); //Reset the ingredint value for the next entary to avoid adding the same entry multiple times by mistake.
                            }
                        }}
                            className="py-2 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 ">Add Ingredient</button>
                        {ingredients.length > 0 ? <div className="col-span-2"> <label id="loi" className="col-span-2 sm:text-sm tracking-wide text-gray-700 block">List of Ingredients:</label>
                            <textarea
                                id="loi"
                                name="loi"
                                placeholder="List of Ingredients..."
                                className="w-full h-24 text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                                value={ingredients}
                            > </textarea> </div> : ""
                        }

                        <label htmlFor="description" className="col-span-2 sm:text-sm tracking-wide text-gray-700 block">Description:</label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="Recipe description..."
                            maxLength="255"
                            className="col-span-2 h-24 text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            onChange={(e) => (
                                setDescription(e.target.value)
                            )}
                            required ></textarea>


                        <label htmlFor="make" className="col-span-2 sm:text-sm tracking-wide text-gray-700 block">How to make it:</label>
                        <textarea
                            id="make"
                            name="make"
                            placeholder="how to make the recipe..."
                            className="col-span-2 h-48 overflow-ellipsis break-words text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            onChange={(e) => (
                                setMake(e.target.value)
                            )}
                            required>
                        </textarea>
                    </div>

                </div>
                <div className="text-red-600 my-2 mx-auto" >{errors}</div>
                <button type="Submit" onClick={formSubmit}
                    className="w-11/12 block mx-auto my-4 py-2 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 ">Submit Category</button>

            </div>
        </div >
    );
}
export default Admin;