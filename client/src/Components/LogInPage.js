import { React, useState, useContext } from 'react';
import { UserContext } from '../Context/UserStatus';

import api from '../Context/Api'; // Importing The api component where the base url is...
import Cookies from 'js-cookie'; // Importing js-cookie to set and remove cookies to authenticate users.
import { useHistory } from 'react-router-dom';

//setErrors(err.response.data.errors.email)
const LogInPage = () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { setLoggedin } = useContext(UserContext);
    const { setAdmin } = useContext(UserContext);

    const emailInput = (e) => {
        setEmail(e.target.value);
    }
    const passwordInput = (e) => {
        setPassword(e.target.value);
    }

    const formSubmit = (e) => {
        e.preventDefault();
        api().get('sanctum/csrf-cookie').then(() => { // Authenticate the request via Sanctum cookies for csrf...
            api().post('login', { // Post the login form with email and password...
                email: email,
                password: password
            }).then(() => {
                Cookies.set('is_user_logged_in', true, { expires: 365, sameSite: 'lax' });
                setLoggedin(true);
                if (email === 'admin@admin.com') {
                    Cookies.set('is_user_admin', true, { expires: 365, sameSite: 'lax' });
                    setAdmin(true);
                }
                history.push('/category/all');
            }).catch(err => (
                setErrors(err.response.data.errors.email)
                //TODO 1) Make better error handling,
            ));
        });
    }

    return (
        <div className="bg-indigo-50">
            <div className="container mx-auto bg-gray-50 min-h-screen border shadow-md flex flex-col justify-center items-center">
                <div className="w-full max-w-xl md:w-2/3 bg-white rounded-lg shadow-lg flex flex-col justify-center items-start">
                    <h1 className="mt-8 mx-auto text-2xl text-blue-500">LogIn Form</h1>
                    <form className="p-10 w-full">
                        <label htmlFor="email" className="my-4 text-xs sm:text-sm tracking-wide text-gray-700 block">E-Mail Address:</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full block my-4 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Enter Email..."
                            onChange={emailInput}
                            required />
                        <label htmlFor="password" className="my-4 text-xs sm:text-sm tracking-wide text-gray-700 block">Password:</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full block mb-7 text-sm sm:text-base placeholder-gray-500 pl-4 pr-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Enter Password..."
                            onChange={passwordInput}
                            required />
                        <div className="border" ></div>
                        <div className="text-red-600 my-4" >{errors}</div>
                        <button type="Submit" onClick={formSubmit}
                            className="w-full block py-2 my-4 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 ">LogIn</button>
                    </form>
                </div>
            </div>
        </div>
    );

}

export default LogInPage;