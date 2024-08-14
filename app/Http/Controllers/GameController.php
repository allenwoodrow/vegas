<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GameController extends Controller
{
    public function wheelOfFortune()
    {
        return inertia('Games/WheelOfFortune');
    }

    public function horseRacing()
    {
        return inertia('Games/HorseRacing');
    }
}

