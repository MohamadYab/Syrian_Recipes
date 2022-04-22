/**
 * Checks if the user is logged in or not...
 * the useEffect will run at first to check if the cookie exists or not. based of that it will know if the user is still logged in or not
 */
import React, { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie'; // Importing js-cookie to set and remove cookies to authenticate users...
export const UserContext = createContext(); // Creating the context of User... 

export const UserProvider = (props) => {
    useEffect(() => {
        {/** useEffect will load once when the application is first loaded */ }
        const user = Cookies.get('is_user_logged_in');
        const admin = Cookies.get('is_user_admin');
        if (user) {
            if (admin) {
                setAdmin(true);
            }
            setLoggedin(true);
        } else {
            setLoggedin(false);
        }
    }, []);
    const [loggedin, setLoggedin] = useState(false); {/** Initialise a status of User... */ }
    const [admin, setAdmin] = useState(false); {/** Initialise a status of User... */ }
    return (
        <UserContext.Provider value={{ loggedin, setLoggedin, admin, setAdmin }}>
            {props.children}  {/** Providing context for all the children that uses the provider... */}
        </UserContext.Provider>
    );
}