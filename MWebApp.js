const http = require('http')
const url = require('url')
const fs = require('fs')
const hbs = require('handlebars')
const mser = require('./MServer')()
const port = 3000

const server = http.createServer(router)
server.listen(port)

const routes = {

    'MovieDetail': {
        action: mser.getMovieDetails,
        view: view('./views/MovieDetailView.hbs')
    },
    'Actor': {
        action: mser.getActorDetails,
        view: view('./views/ActorView.hbs')
    },
    'Movies': {
        action: foot.getMovies,
        view: view('./views/MoviesView.hbs')
    }
}

//resp e o callback!
function router(req, resp) {
    const urlObj = url.parse(req.url, true)
    const actionName = urlObj.pathname.substring(1)
    if(routes[actionName] != undefined) {
        const action = routes[actionName].action
        const view = routes[actionName].view
        //TODO, Going to have to redo mapParameters probably
        const parameters = mapParameters(urlObj.query, action)
        parameters.push(actionCallback(resp, view))
        action.apply(this, parameters)
    } else {
        resp.statusCode = 404 // Resource Not Found
        resp.end()
    }
}

function actionCallback(resp, view) {
    return (err, obj) => {
        let data
        if(err) {
            data = err.message
            resp.statusCode = 500
        } else {
            data =  view(obj)
            resp.statusCode = 200
        }
        resp.setHeader('Content-Type', 'text/html')
        resp.end(data)
    }
}

function view(viewPath) {
    const viewSrc = fs.readFileSync(viewPath).toString()
    return hbs.compile(viewSrc)
}

function mapParameters(query,func){
    const funcName = func.toString()
    const formalParams = func.toString()
        .substring(funcName.indexOf('(')+1,funcName.indexOf(')'))
        .replace(/\s/g, '')
        .split(',')
    formalParams.pop() // remove callback from formal parameters
    if(formalParams.length != Object.keys(query).length){
        return
    }
    const actualParams = []
    for(i = 0; i < formalParams.length; ++i){
        const param = formalParams[i]
        if(!Object.prototype.hasOwnProperty.call(query, param)){
            return
        }
        actualParams.push(query[param])
    }
    return actualParams
}