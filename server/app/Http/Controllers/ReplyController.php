<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator; // Importing the Validator class for validation. 
use App\Models\Reply;
use Illuminate\Support\Facades\DB; //To use the DB query builder to join tables
use Illuminate\Support\Facades\Gate;

class ReplyController extends Controller
{
    /**
     * Store a newly created Reply in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'rating_id' => 'required',
            'reply_input' => 'required' // The reply_input cannot have more than 666 characters.
        ]);
        if($validator->fails()){
            return $validator->errors();
        }
        // If validation passed the below code will be executed, if not it will return an error message.

        $reply = new Reply;
        $reply->user_id = $request->user_id;
        $reply->rating_id = $request->rating_id;
        $reply->reply_input = $request->reply_input;
        $result = $reply->save();
        if($result){
            return response()->json([
                'Message' => 'reply was submitted successfully!',
                'id' => $reply->id
            ], 201);
        } else{
            return response()->json([
                'Message' => 'Could not submit the reply!'
            ], 500);
        }
    }

    /**
     * Get all the replies for a specific rating by the rating_id
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id){ 
        $replies = Reply::where('rating_id' ,$id)->get();
        if($replies !== null) {
            return $replies;
        } else {
            return response()->json([
                'Message' => 'No replies for rating id: ' . $id
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
        $reply = Reply::find($id); // The targeted reply
        $user = auth()->user(); // The user ID (it is assigned with the tokens, and as thsi rout goes through sanctum middleware we can get thsi information)
        if ($user->id !== $reply->user_id || $user->role !== 'Admin') { // Checks if the erquest sender is the user who owns the reply or is the admin.
            return response()->json([
                'Message' => 'You have no permission to update this reply!'
            ], 401);
        }

        if($reply !== null) {
            $reply->reply_input = $request->reply_input;
            $result=$reply->save();
            if($result){
                return response()->json([
                    'Message' => 'Reply was updated successfully!'
                ], 202);
            } else {
                return response()->json([
                    'Message' => 'Something went wrong!'
                ], 500);
            }
        } else {
            return response()->json([
                'Message' => 'Bad requiest! No matching reply with the id: ' . $id
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
        $reply = Reply::find($id); // The targeted reply
        $user = auth()->user(); // The user ID (it is assigned with the tokens, and as thsi rout goes through sanctum middleware we can get thsi information)
        if ($user->id !== $reply->user_id || $user->role !== 'Admin') { // Checks if the erquest sender is the user who owns the reply or is the admin.
            return response()->json([
                'Message' => 'You have no permission to delete this reply!'
            ], 401);
        }

        $destroied = Reply::destroy($id); //Destroying the record. 
        if($destroied){
            return response()->json([
                'Message' => 'reply was destroied successfully!'
            ], 202);
        } else {
            return response()->json([
                'Message' => 'Could not find the reply!'
            ], 500);
        }
    }
}
