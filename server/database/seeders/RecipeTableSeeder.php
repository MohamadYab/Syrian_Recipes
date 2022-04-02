<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RecipeTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        DB::table('recipes')->insert([
            'rName' => 'Kebabs',
            'image' => 'Kebab-123',
            'description' => 'Kebab Description',
            'ingredients' => 'ingredient one,ingredient two',
            'howToMake' => 'How to make Kebab',
            'timeToPrep' => '14m',
            'categories_id' => '3'
        ]);

        DB::table('recipes')->insert([
            'rName' => 'Molokhia',
            'image' => 'Molokhia-123',
            'description' => 'Molokhia Description',
            'ingredients' => 'ingredient one,ingredient two',
            'howToMake' => 'How to make Molokhia',
            'timeToPrep' => '14m',
            'categories_id' => '1'
        ]);

        DB::table('recipes')->insert([
            'rName' => 'Hamburger',
            'image' => 'Hamburger-123',
            'description' => 'Kebab Hamburger',
            'ingredients' => 'ingredient one,ingredient two',
            'howToMake' => 'How to make Hamburger',
            'timeToPrep' => '50m',
            'categories_id' => '2'
        ]);

        DB::table('recipes')->insert([
            'rName' => 'Shawarma',
            'image' => 'Shawarma-123',
            'description' => 'Shawarma Description',
            'ingredients' => 'ingredient one,ingredient two',
            'howToMake' => 'How to make Shawarma',
            'timeToPrep' => '14m',
            'categories_id' => '2'
        ]);
    }
}
