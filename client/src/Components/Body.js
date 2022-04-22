/**
 * The Main Body of the Page...
 */
import { React } from 'react';

// Importing components...
import Categories from './Categories';
import Recipes from './Recipes';

const Body = () => {
    return (
        <div className="bg-indigo-50">
            <div className="container mx-auto bg-gray-50 min-h-screen border shadow-md">
                <Categories />
                <Recipes />

            </div>
        </div>
    );
}

export default Body;