<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRecipesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->string('rName');
            $table->string('image');
            $table->text('description');
            $table->text('ingredients'); //It will be a list of ingredients, so we store it as a jason format inside the table.
            $table->text('howToMake');
            $table->string('timeToPrep',10);
            $table->unsignedSmallInteger('categories_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
}
