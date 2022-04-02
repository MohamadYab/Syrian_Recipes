<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Importing the Validator class for validation. 
use App\Models\Rating;
use Illuminate\Support\Facades\DB; // To use the DB query builder to join tables

class RatingController extends Controller
{

    /**
     * Store a newly created Rating in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'recipe_id' => 'required',
            'stars' => 'required|digits_between:1,5',
            'rating_input' => 'required' // The rating_input cannot have more than 666 characters.
        ]);
        if($validator->fails()){
            return $validator->errors();
        }
        // If validation passed the below code will be executed, if not it will return an error message.

        $rating = new Rating;
        $rating->user_id = auth()->user()->id;
        $rating->recipe_id = $request->recipe_id;
        $rating->stars = $request->stars;
        $rating->rating_input = $request->rating_input;
        $result = $rating->save();
        if($result){
            return response()->json([
                'Message' => 'Rating was submitted successfully!',
                'id' => $rating->id
            ], 201);
        } else{
            return response()->json([
                'Message' => 'Could not submit the rating!'
            ], 500);
        }
    }

    /**
     * Get all the ratings for a specific recipe by the recipe_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){ 
        $ratings = Rating::where('recipe_id' ,$id)->get();
        if($ratings !== null) {
            return $ratings;
        } else {
            return response()->json([
                'Message' => 'No ratings for recipe id: ' . $id
            ], 404);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $rating = Rating::find($id); //The targeted rating
        $user = auth()->user(); // The user ID (it is assigned with the tokens, and as thsi rout goes through sanctum middleware we can get thsi information)
        if ($user->id !== $rating->user_id || $user->role !== 'Admin') { // Checks if the erquest sender is the user who owns the rating or is the admin.
            return response()->json([
                'Message' => 'You have no permission to update this rating!'
            ], 401);
        }
        if($rating !== null) {
            $rating->stars = $request->stars;
            $rating->rating_input = $request->rating_input;
            $result=$rating->save();
            if($result){
                return response()->json([
                    'Message' => 'rating was updated successfully!'
                ], 202);
            } else {
                return response()->json([
                    'Message' => 'Something went wrong!'
                ], 500);
            }
        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching rating with the id: ' . $id
            ], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $rating = Rating::find($id); //The targeted rating
        $user = auth()->user(); // The user ID (it is assigned with the tokens, and as thsi rout goes through sanctum middleware we can get thsi information)
        if ($user->id !== $rating->user_id || $user->role !== 'Admin') { // Checks if the erquest sender is the user who owns the rating or is the admin.
            return response()->json([
                'Message' => 'You have no permission to delete this rating!'
            ], 401);
        }

        $destroied = Rating::destroy($id);
        if($destroied){
            return response()->json([
                'Message' => 'Rating was destroied successfully!'
            ], 202);
        } else {
            return response()->json([
                'Message' => 'Could not find the rating!'
            ], 500);
        }
    }
}
