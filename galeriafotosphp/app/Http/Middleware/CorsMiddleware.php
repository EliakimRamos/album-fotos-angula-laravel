<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->is('api/*')){
            header('ACCESS-CONTROL-ALLOW-ORIGIN: *');
            header('ACCESS-CONTROL-ALLOW-METHODS: GET,POST,PUT,DELETE');
            header('Access-Control-Allow-Headers: Content-type');
        }
        return $next($request);
    }
}
