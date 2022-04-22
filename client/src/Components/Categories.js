import { React, useState, useContext } from 'react';

//Importing React Dom...
import { Link } from 'react-router-dom';
import api from '../Context/Api';

// Importing the CategoryContext...
import { CategoryContext } from '../Context/CategoryContext';
import { UserContext } from '../Context/UserStatus';
import { RecipesContext } from '../Context/RecipesContext';


const Categories = () => {
    const [categories, setCategoryList] = useContext(CategoryContext);
    const [displayedRecipes, setDisplayedRecipes] = useContext(RecipesContext);
    const { admin } = useContext(UserContext);
    const [openedTab, setOpenedTab] = useState(0);

    const deleteCategory = (id) => {
        api().get('sanctum/csrf-cookie').then(() => { // Authenticate the request via Sanctum cookies for csrf...
            api().delete(`api/category/${id}`, { id })
                .then(() => {
                    setCategoryList(categories.filter(category => (category.id !== id)));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    }

    const clickHandler = (id) => {
        if (id !== null) { // Category/id gets all the recipes for with a category id equal to the id provided
            api().get(`api/category/${id}`)
                .then((res) => {
                    setDisplayedRecipes(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            setOpenedTab(id);
        } else { //if no id provided, All is select so call the /recipes route
            api().get(`api/recipes`)
                .then((res) => {
                    setDisplayedRecipes(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
            setOpenedTab(0);
        }
    }

    return (
        <div className="h-auto my-14 justify-center md:justify-start flex flex-wrap content-center">
            <ul className="list-none md:ml-8">
                <li key="0" className="inline-block mb-5">
                    <Link to={`/category/all`} className={
                        "py-2 px-4 mx-2 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 "
                        + (openedTab === 0 ? "bg-blue-500" : "text-blue-500")}
                        onClick={() => (clickHandler(null))} >All</Link></li>
                {categories.length > 0 ? categories.map(category => (
                    <li key={`${category.id}`} className="inline-block mb-5">
                        <Link to={`/category/${category.id}`}
                            className={
                                "py-2 px-4 mx-2 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 "
                                + (openedTab === category.id ? "bg-blue-500 text-blue-50" : "text-blue-500")}
                            onClick={() => (clickHandler(category.id))} >{category.categoryName}</Link>
                        { admin ? <a onClick={() => (deleteCategory(category.id))} className=" bg-red-400 text-red-50 px-1 py-2 rounded hover:bg-red-600 cursor-pointer text-sm">X</a> : ""}
                    </li>
                )) : ""}
            </ul>
        </div>
    );
}

export default Categories;