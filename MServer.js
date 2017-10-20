'use strict'

const Movie = require('./model/Movie')

module.exports = init

function init(dataSource) {
    let req
    if (dataSource)
        req = dataSource
    else
        req = require('request')

    const services = {
        getMovies,
        getActorDetails,
        getMovieDetails
    }
    return services

    function reqAsJson(path, cb) {
        req(path, (err, res, data) => {
            if (err) return cb(err)
            const obj = JSON.parse(data.toString())
            cb(null, obj)
        })
    }

    function getMovies(name, cb){
        //insert %20?
        const path = `https://api.themoviedb.org/3/search/movie?api_key=668c5f272f87669446f01cfcc3ab13f4&query=${name}`;
        reqAsJson(path, cb);
    }

    function getActorDetails(id , cb){
        const actorPath = "https://api.themoviedb.org/3/person/{person_id}?api_key=668c5f272f87669446f01cfcc3ab13f4"
        const charPath = "https://api.themoviedb.org/3/person/{person_id}/movie_credits?api_key=668c5f272f87669446f01cfcc3ab13f4"
        reqAsJson(actorPath, (err, actor) => {
            if(err) return cb(err)
            reqAsJson(charPath, (err, char) => {
                if(err) return cb(err)
                cb(null, new Actor(actor, char))
            })
        })
    }

    function getMovieDetails(movieId, cb){
        //TODO, search a cache first
        const moviePath = `https://api.themoviedb.org/3/movie/${movieId}?api_key=668c5f272f87669446f01cfcc3ab13f4`;
        const charPath = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=668c5f272f87669446f01cfcc3ab13f4`;
        reqAsJson(moviePath, (err, movie) => {
            if (err) return cb(err)
            reqAsJson(charPath, (err, char) => {
                if (err) return cb(err)
                cb(null, new Movie(movie, char))
            });
        });
    }


}