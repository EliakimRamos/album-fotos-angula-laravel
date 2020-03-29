<?php

use Illuminate\Database\Seeder;
use App\Album;
use App\Photo;
use Faker\Factory;

class AlbumsTableSeede extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {   $self = $this;
       // \File::deleteDirectory(storage_path('app'),true);
        factory(Album::class,20)
        ->create()
        ->each(function($album) use($self){
            $self->generetePhotos($album);
        });
    }

    private function generetePhotos(Album $album){
        $albumDir = storage_path("app/{$album->id}");
        if(!file_exists($albumDir)){
            \File::makeDirectory($albumDir);
        }
        $faker = Factory::create();
        factory(Photo::class,5)
            ->make()
            ->each(function($photo) use($album,$faker,$albumDir){
                $photo->album_id = $album->id;
                $photo->file_name = $faker->image($albumDir,640,480,'cats',false);
                $photo->save();
            });
    }
}
