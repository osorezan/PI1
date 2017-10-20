const http = require('http')
const mser = require('./Mservice')()
const port = 3000
var express = require('express')

/**
 * Init HTTP server
 */
const server = http.createServer(router)
server.listen(port)

/**
 * Endpoints paths
 */

const routes = {

    'MovieDetail': {
        action: mser.getMovieDetails,
        view: view('./views/MovieDetailView.html')
    },
    'Actor': {
        action: mser.getActorDetails,
        view: view('./views/ActorView.html')
    },
    'Movies': {
        action: foot.getMovies,
        view: view('./views/MoviesView.html')
    }
}