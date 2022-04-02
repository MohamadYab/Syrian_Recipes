<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;
    protected $table = "recipes"; // Assigning the name of the table

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'rName',
        'image',
        'description',
        'ingredients',
        'howToMake',
        'timeToPrep',
        'categories_id',
    ];

    public $timestamps = false; //Disabling the timestamps records for categories.

}
