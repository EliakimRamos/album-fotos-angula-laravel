<?php

namespace App\Http\Controllers;

use App\Photo;
use Illuminate\Http\Request;
use App\Album;
use App\Http\Resources\PhotoResource;
use Illuminate\Support\Facades\Storage;

class PhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Album $album)
    {
        return PhotoResource::collection($album->photos);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Album $album)
    {
       $request
            ->file('file_name')
            ->store("$album->id");
       $fileName  = $request->file('file_name')->hashName();
       $photo     =  Photo::create([
                                    'name'     => $request->name,
                                    'album_id' => $album->id,
                                    'file_name'=> $fileName
                                ]);
        return new PhotoResource($photo);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function show(Photo $photo)
    {   
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function edit(Photo $photo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Photo $photo)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Photo  $photo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $photo = Photo::find($request->id);
        Storage::delete("{$photo->album_id}/{$photo->file_name}");
        return $photo->destroy($request->id);
    }

    public function photoUrl($photoName){
        $photos = Photo::whereFileName($photoName)->get();
        if(!$photos->count()){
            abort(404);
        }
        $photo       = $photos->first();
        $photoPath   = storage_path("app/{$photo->album_id}/$photo->file_name");
        //return response()->download($photoPath);
        return response()->file($photoPath);
    }
}
