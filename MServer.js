'use strict'

module.exports = MService

function init(dataSource) {
    let req
    if (dataSource)
        req = dataSource
    else
        req = require('request')

    const services = {
        getMovies,
        getActors,
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
        const path = "https://api.themoviedb.org/3/search/movie?api_key=668c5f272f87669446f01cfcc3ab13f4&query=${name}";
        reqAsJson(path, cb);
    }
}