<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Importing the Validator class for validation. 
use App\Models\Category;
use Illuminate\Support\Facades\DB;

class CategoryController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Category::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request for examining the HTTP request
     * @return \Illuminate\Http\Response Check the response of the save action.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'categoryName' => 'required|alpha|unique:categories', // The category name must contain entirely alphabetic characters and be uniqe unique.

        ]);
        if($validator->fails()){
            return $validator->errors();
        }
        // If validation passed the below code will be executed, if not it will return an error message.

        $category = new Category;
        $category->categoryName=$request->categoryName;
        $result=$category->save();
        if($result){
            return response()->json([
                'Message' => 'Category was created successfully!',
                'id' => $category->id
            ], 201);
        } else{
            return response()->json([
                'Message' => 'Could not create a new Category! '
            ], 500);
        }
    }

    /**
     * Return recipes for a specific category.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Category::find($id);
        if($category !== null) {
            return DB::table('categories')
            ->join('recipes', 'categories.id', 'recipes.categories_id')->where('categories.id', $id)
            ->get();
        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching category with the name: ' . $id
            ], 404);
        }
    }

    /**
     * Update the categoryName of a specified category by the category id column.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id){
        $category = Category::find($id);
        if($category !== null) {
            $category->categoryName = $request->categoryName;
            $result=$category->save();
            if($result){
                return response()->json([
                    'Message' => 'Category was updated successfully!'
                ], 202);
            } else {
                return response()->json([
                    'Message' => 'Something went wrong!'
                ], 500);
            }

        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching category with the id: ' . $id
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
        $category = Category::find($id);
        if($category !== null) {
            Category::destroy($id);
            return response()->json([
                'Message' => 'Category was destroyed successfully!'
            ], 204);
        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching category with the name: ' . $category
            ], 404);
        }
        
    }
}
