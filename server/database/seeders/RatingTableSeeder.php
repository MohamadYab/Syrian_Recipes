<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RatingTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('ratings')->insert([
            [
                "user_id" => 2,
                "recipe_id" => 3,
                "stars" => 4,
                "rating_input" => "Rating input 1"
            ],
            [
                "user_id" => 1,
                "recipe_id" => 4,
                "stars" => 5,
                "rating_input" => "Rating input 2"
            ],
            [
                "user_id" => 2,
                "recipe_id" => 1,
                "stars" => 3,
                "rating_input" => "Rating input 3"
            ],
            [
                "user_id" => 1,
                "recipe_id" => 3,
                "stars" => 2,
                "rating_input" => "Rating input 4"
            ]
        ]);
    }
}
