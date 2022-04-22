/**
 * Getting all the gategories from Syrian+ Recipes API and provide them to the whole app...
 */
import React, { useState, createContext, useEffect } from 'react';
import api from './Api'; // Importing api to use axios for CRUDs...

export const CategoryContext = createContext(); // Creating the context of categories... 

export const CategoryProvider = (props) => {
    useEffect(() => {
        {/** useEffect will load once when the application is first loaded */ }
        api().get('api/category')
            .then(response => {
                setCategoryList(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    {/** useEffect First so the GET request is made before changing the state... */ }

    const [categories, setCategoryList] = useState([""]); {/** Initialise a state of array of categories... */ }
    return (
        <CategoryContext.Provider value={[categories, setCategoryList]}>
            {props.children}  {/** Providing context for all the children that uses the provider... */}
        </CategoryContext.Provider>
    );
}