<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Storage; // Importing the Storage Facade to be able to to save pictures to the publid_path.
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Importing the Validator class for validation. 
use App\Models\Recipe;
use Illuminate\Support\Facades\DB; // To use the DB query builder

class RecipeController extends Controller
{
    /**
     * Return all recipes.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() {
        //$recipes = Recipe::all(); //Gets us all the records inside the Recipe table. 
        //$recipes = Recipe::orderBy('table_name', 'asc/desc' #Auto is asc and we don't have to include it)->get(); //Gets us all the records inside the Recipe table ordered by some table. 
        //$recipes = Recipe::where('field_name','required_match')->get(); //Gets the record that matches the required_match. 
        return Recipe::all();
    }
    
    /**
     * Store a new recipe record.
     * 
     * @param Request $request: for examining the HTTP request
     * @return result: Check the response of the save action.
     */
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'rName' => 'required|unique:recipes', // The recipe name must contain entirely alphabetic characters and be uniqe unique.
            'image' => 'mimetypes:image/jpeg,image/jpg,image/png|max:1999', // The accepted MIMEs types.
            'description' => 'required',
            'ingredients' => 'required', // This must be json because that is how we set the column type in the database
            'howToMake' => 'required',
            'timeToPrep' => 'required',
            'categories_id' => 'required'
        ]);
        if($validator->fails()){
            return $validator->errors();
        }
        // If validation passed the below code will be executed, if not it will return an error message.

        $recipe = new Recipe;
        $recipe->rName = $request->rName;
        $recipe->image = $request->file('image')->store('/recipe_images');
        $recipe->description = $request->description;
        $recipe->ingredients = $request->ingredients;
        $recipe->howToMake = $request->howToMake;
        $recipe->timeToPrep = $request->timeToPrep;
        $recipe->categories_id = $request->categories_id;
        $result = $recipe->save();
        if($result){
            return response()->json([
                'Message' => 'Recipe was created successfully!',
                'id' => $recipe->id
            ], 201);
        } else{
            return response()->json([
                'Message' => 'Could not create a new recipe! '
            ], 500);
        }
    }
    
    /**
     * Retrun a specific recipe by its id.
     * The method will check if there is a recipe with the specifid id. If found, it will return it, if not then return a 404 not found response.
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){ 
        $recipe = DB::table('recipes')
        ->join('categories', 'categories.id', '=', 'categories_id')
        ->select('recipes.*', 'categories.categoryName')
        ->where('recipes.id', $id)
        ->get();
        if($recipe !== null) {
            return $recipe;
        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching recipe with the id: ' . $id
            ], 404);
        }
    }

    public function search($name){
        $exists = DB::table('recipes')->where('rName', $name)->exists();
        if($exists){
            return Recipe::where('rName', $name)->get();
        }else{
            return response()->json([
                'Message' => 'Bad requiest! No matching recipe with the name: ' . $name
            ], 404);
        }
    }

    /**
     * Update the specified recipe in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        $recipe = Recipe::find($id);
        $oldImagePath = $recipe->image;
        if(Storage::exists($oldImagePath)){// If the file is not null
            unlink($recipe->image); // Removes the old image from its directory
        }
        if($recipe !== null) {
            $recipe->rName = $request->rName;
            $recipe->image = $request->file('image')->store('/recipe_images');
            $recipe->description = $request->description;
            $recipe->ingredients = $request->ingredients;
            $recipe->howToMake = $request->howToMake;
            $recipe->timeToPrep = $request->timeToPrep;
            $recipe->categories_id = $request->categories_id;
            $result = $recipe->save();
            if($result){
                
                return response()->json([
                    'Message' => 'Recipe was updated successfully!'
                ], 202);
            } else {
                return response()->json([
                    'Message' => 'Something went wrong!'
                ], 500);
            }

        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching recipe with the id: ' . $id
            ], 404);
        }
    }


    /**
     * Remove the specified recipe from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id){
        $recipe = Recipe::find($id);
        if($recipe !== null) {
            Recipe::destroy($id);
            return response()->json([
                'Message' => 'Recipe was destroyed successfully!'
            ], 204);
        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching recipe with the name: ' . $recipe
            ], 404);
        }
        
    }
}
