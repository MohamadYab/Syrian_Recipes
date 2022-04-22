/**
 * Provide Recipes context to the components that import the provider and use it.
 */
import React, { useState, createContext, useEffect } from 'react';
import api from './Api'; // Importing api to use axios for CRUDs...

export const RecipesContext = createContext(); // Context of the recipes list.

export const RecipesProvider = (props) => {
    useEffect(() => {
        api().get('api/recipes')
            .then(response => {
                setDisplayedRecipes(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    {/** useEffect First so the GET request is made before changing the state... */ }
    const [displayedRecipes, setDisplayedRecipes] = useState([""]);
    return (
        <RecipesContext.Provider value={[displayedRecipes, setDisplayedRecipes]}>
            {props.children}
        </RecipesContext.Provider>
    );
}