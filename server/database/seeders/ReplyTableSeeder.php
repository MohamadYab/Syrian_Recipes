<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ReplyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('replies')->insert([
            [
                "user_id" => 1,
                "rating_id" => 1,
                "reply_input" => "reply_input 1"
            ],
            [
                "user_id" => 2,
                "rating_id" => 2,
                "reply_input" => "reply_input 2"
            ],
            [
                "user_id" => 2,
                "rating_id" => 3,
                "reply_input" => "reply_input 3"
            ],
            [
                "user_id" => 1,
                "rating_id" => 4,
                "reply_input" => "reply_input 4"
            ]
        ]);
    }
}
