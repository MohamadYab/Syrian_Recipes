import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// Importing api to make CRUD calls
import api from '../Context/Api';


const Recipe = () => {
    const param = useParams(); {/** Get the parameters of the link, in our case it is the recipe id */ }
    const imageFolderPath = "https://my135.brighton.domains/storage/";
    useEffect(() => {
        api().get(`api/recipes/${param.id}`)
            .then(response => {
                // Setting values to states' variables...
                setName(response.data[0].rName);
                setImage(response.data[0].image);
                setDescription(response.data[0].description);
                setMake(response.data[0].howToMake);
                setTime(response.data[0].timeToPrep);
                setIngredients(response.data[0].ingredients);
                setCategoryName(response.data[0].categoryName);

            })
            .catch((error) => {
                // Error
                if (error.response) {
                    setErrors(error.response);
                } else if (error.request) {
                    setErrors(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setErrors('Un-Known Error');
                }
            })
    }, []);

    //Recipe Information
    const [name, setName] = useState('');
    const [image, setImage] = useState([0]);
    const [time, setTime] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [ingredients, setIngredients] = useState(""); {/**  Array of ingredients */ }
    const splitIngredientsArr = ingredients.split(',');
    const [description, setDescription] = useState('');
    const [make, setMake] = useState('');
    {/**  Errors */ }
    const [errors, setErrors] = useState([""]);


    // Ratings List...
    const [ratings, setRatings] = useState([]);
    const showRatings = () => {
        setRatings(["hey"]);
        api().get(`api/rating/${param.id}`)
            .then(res => {
                setRatings(res.data);
            })
            .catch(error => {
                if (error.response) {
                    setErrors(error.response);
                } else if (error.request) {
                    setErrors(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    setErrors('Un-Known Error');
                }
            });
    }

    // Rating Form...
    const [ratingComment, setRatingComment] = useState('');
    const [stars, setStars] = useState(0);
    const submitRating = () => {
        api().get('sanctum/csrf-cookie').then(() => {
            api().post('api/rating', {
                recipe_id: param.id,
                stars: stars,
                rating_input: ratingComment
            })
                .then(res => {
                    setRatings([...ratings, { stars: stars, rating_input: ratingComment }]);
                })
                .catch(error => {
                    if (error.response) {
                        setErrors(error.response);
                    } else if (error.request) {
                        setErrors(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        setErrors('Un-Known Error');
                    }
                });
        });
    }

    return (
        <div className="bg-indigo-50">
            <div className="container mx-auto bg-gray-50 min-h-screen border shadow-md">
                <div className="grid md:grid-cols-3 gap-4 w-11/12 mx-auto flex">
                    <div className="con-span-3 md:col-span-1 rounded overflow-hidden h-full"
                        style={{ maxHeight: '400px' }}>
                        <img
                            src={`${imageFolderPath + image}`}
                            alt={name}
                            className="w-max h-48 md:h-full object-scale-down" />
                    </div>
                    <div className="col-span-3 md:col-span-2 md:order-first py-8">
                        <p className=""><span className="font-medium underline mr-4 ">Recipe Name:</span> {name}</p>
                        <p className=""><span className="font-medium underline mr-4 ">Recipe Category:</span> {categoryName}</p>
                        <p className=""><span className="font-medium underline  mr-4 whitespace-pre-wrap">Description:</span></p>
                        <div>{description}</div>
                        <p className=""><span className="font-medium underline mr-4 ">Time to make:</span>{time}</p>
                        <ol className="list-decimal"><span className="font-medium underline mr-4 ">Ingredients needed:</span>
                            {splitIngredientsArr.map(ingredient => (
                                <li className="ml-4">{ingredient}</li>
                            ))}</ol>
                        <p className=""><span className="font-medium underline  mr-4 whitespace-pre-wrap">How to make it:</span></p>
                        <div>{make}</div>
                    </div>
                    <div className="border col-span-3 mt-10" ></div>


                    {/**Rating Form */}
                    <div className="col-span-3">
                        <div className="w-11/12 mx-auto mt-4">
                            <label htmlFor="rating" className="mb-2 sm:text-sm tracking-wide text-gray-700 block">Rating:</label>
                            <div className="my-2 grid grid-rows-4 xl:grid-rows-3 grid-cols-1 xl:grid-cols-3 gap-4 h-64 xl:h-48">
                                <select className="col-span-1 xl:row-start-1 xl:col-start-3 py-2 rounded border border-gray-400 focus:outline-none focus:border-blue-500"
                                    onChange={(e) => (setStars(e.target.value))}
                                    required
                                    defaultValue="null">
                                    <option value="null" disabled>How Many Stars</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                <textarea
                                    id="rating"
                                    name="rating"
                                    className="col-span-1 row-span-2 xl:col-span-2 xl:row-span-3 max-h-full text-sm sm:text-base placeholder-gray-500 px-4 rounded-lg border border-gray-400 py-2 focus:outline-none focus:border-blue-500"
                                    placeholder="Enter rating..."
                                    maxLength="600"
                                    onChange={(e) => (
                                        setRatingComment(e.target.value)
                                    )}
                                    required></textarea>
                                <button type="Submit" onClick={submitRating}
                                    className="col-span-1 xl:row-start-3 xl:col-start-3 py-2 bg-blue-500 text-blue-50 hover:text-white hover:bg-blue-400 rounded transition ease-in duration-200 cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 ">
                                    Submit Rating...
                                </button>
                            </div>
                            <div className="text-red-600 my-2 mx-auto" ></div>
                        </div>
                        <div>{errors}</div>
                        <div className="border col-span-3 mt-10" ></div>
                    </div>


                    <div className="col-span-3 mb-10">
                        <a onClick={() => (showRatings())} className="ml-4 text-blue-500 hover:text-blue-400 cursor-pointer my-6">Show all ratings</a>
                        {ratings.map(rating => (
                            <div>
                                <p className="m-2"><span>Stars:</span> {rating.stars}</p>
                                <p className="m-2"><span>Comment:</span> {rating.rating_input}</p>
                                <div className="border col-span-3 my-6" ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Recipe;