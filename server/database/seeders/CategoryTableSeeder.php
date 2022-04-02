<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class CategoryTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('categories')->insert([
            ['categoryName' => 'Main_dish'],
            ['categoryName' => 'Wraps'],
            ['categoryName' => 'Kebabs'],
            ['categoryName' => 'Bakings']
        ]);
    }
}
