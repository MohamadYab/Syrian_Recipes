/**
 * The Main Application Component...
 */
import React from 'react';

// Importing Components
import Header from './Header';
import Routes from './Routes';


// Importing react-router-dom elements
// NOTE: React router includes and uses history API.
import { HashRouter as Router } from 'react-router-dom';
import { CategoryProvider } from '../Context/CategoryContext';
import { UserProvider } from '../Context/UserStatus';
import { RecipesProvider } from '../Context/RecipesContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <CategoryProvider>
          <RecipesProvider>
            <Header />
            <Routes /> {/** Importing Routes component to manage different routes on the page. */}
          </RecipesProvider>
        </CategoryProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
