import { React, useContext } from 'react';
import '../assets/main.css';

import api from '../Context/Api'; // Importing The api component where the base url is...
import Cookies from 'js-cookie'; // Importing js-cookie to set and remove cookies to authenticate users...
import { Link } from 'react-router-dom'; // Importing react-router-dom elements...

// LogOut and UserStatus function.
import { UserContext } from '../Context/UserStatus';
import { RecipesContext } from '../Context/RecipesContext';



const Header = () => {
    const { loggedin, setLoggedin } = useContext(UserContext);
    const [displayedRecipes, setDisplayedRecipes] = useContext(RecipesContext);
    const { admin, setAdmin } = useContext(UserContext);

    const logOut = () => {
        api().get('sanctum/csrf-cookie').then(() => { // Authenticate the request via Sanctum cookies for csrf...
            api().post('logout')// Post the logout form with email and password...
                .then(response => { // If response has error display it, if not set a coockie with the user information and redirect them to homepage.
                    if (response.data.error) {
                        console.log(response.data.error);
                    } else {
                        if (typeof window !== 'undefined') {
                            // remove the logged in user's cookie and redirect to login page
                            Cookies.remove('is_user_logged_in', { expires: 365, sameSite: 'lax' });
                            setLoggedin(false);
                            setAdmin(false);
                        }
                    }
                });
        });
    }

    const getAllRecipes = () => {
        api().get(`api/recipes`)
            .then((res) => {
                setDisplayedRecipes(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <header className="bg-blue-500 p-4" >
            <nav className="flex justify-between items-center">
                <div className="flex items-center">
                    <Link to="/" onClick={() => (getAllRecipes)} >
                        <img src={process.env.PUBLIC_URL + '/img/logo.png'} alt="Syrian+ Recipe logo" className="inline-block mr-2 cursor-pointer max-h-9" />
                    </Link>
                    <Link to="/" onClick={() => (getAllRecipes)} className="inline-block p-2 text-blue-100 hover:text-white cursor-pointer" >Home</Link>
                </div>

                {loggedin ? admin ? <div>
                    <Link to="/admin" className="inline-block p-2 text-blue-100 hover:text-white cursor-pointer" >Admin</Link>
                    <Link to="/" className="inline-block p-2 text-blue-100 hover:text-white cursor-pointer" onClick={logOut} >Log Out</Link>
                </div>
                    : <Link to="/" className="inline-block p-2 text-blue-100 hover:text-white cursor-pointer" onClick={logOut} >Log Out</Link>
                    : <div>
                        <Link to="/login" className="inline-block p-2 text-blue-100 hover:text-white cursor-pointer" >Log In</Link>
                        <Link to="/signup" className="inline-block py-2 px-4 mx-2 text-blue-50 bg-green-500 hover:text-white hover:bg-green-400 rounded transition ease-in duration-200 cursor-pointer" >Sign Up</Link>
                    </div>}
            </nav>
        </header>
    );
}

export default Header;