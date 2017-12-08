<?php

use Faker\Generator as Faker;

$factory->define(App\Task::class, function (Faker $faker) {

    return [
        'keep' => $faker->sentence, //Crear pequeñas oraciones
    ];
});
