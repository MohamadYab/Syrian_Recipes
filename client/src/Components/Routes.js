import React from 'react';
import { Route, Switch } from 'react-router-dom';

//Importing components
import LogInPage from './LogInPage';
import SignUpPage from './SignUpPage';
import Admin from './Admin';
import Recipe from './Recipe';
import Body from './Body';

const Routes = () => {
    const domain = "https://my135.brighton.domains/ci609/assignment";
    return (
        <Switch>
            <Route path="/login" exact component={LogInPage} /> {/** LogIn Form */}
            <Route path="/signup" exact component={SignUpPage} /> {/** SignUp Form */}
            <Route path="/admin" exact component={Admin} /> {/** Admin page with forms to create stuff */}
            <Route path="/recipes/:id" exact component={Recipe} /> {/** Recipes' pages by recipes' IDs */}
            <Route path="/:category?" exact component={Body} /> {/**Checks the current category to fetch the data from the DB */}
            <Route path="/" exact component={Body} /> {/** The exact prevents the home page from conflictign with other paths because all paths start with a / */}
            <Route component={Body} /> {/**A default route when the entered link doesn't match any path */}

        </Switch>
    );
}
export default Routes;