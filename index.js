import http from 'node:http';
import express from 'express'
import { Movie,Series,Song } from './Models.js';
import { getAllMovies,getMovieByName,deleteMovieByName,updateMovie,postMovie } from './Repository.js';

const hostname = "127.0.0.1"
const port = 3000
const app = express()

app.use(express.json())

//database
let seriesList = [new Series("Loki",2,9,13),new Series("She hulk",1,9,13),new Series("Batman",3,9,13)]
let songsList = [new Song("Versace","Migos","Hip hop",200000,new Song("Taylor Port Junkie","Rylo Rodriguez","Hip hop",1000000))]

//endpoints
const movies = "/Movies"
const moviesById = "/Movies/:name"
const series = "/Series"
const seriesById = "/Series/:name"
const songs = "/Songs"
const songsById = "/Songs/:name"

handleMoviesEndpoint()

function handleMoviesEndpoint(){
    app.get(movies,async (req,res)=>{
        let movieName = req.query.name
        console.log(movieName)
        let foundMovie = await getMovieByName(movieName)
        res.send(JSON.parse(JSON.stringify({foundMovie})))
    })

    app.get(movies,async (req,res)=>{
        let movies = await getAllMovies()
        res.send(JSON.parse(JSON.stringify({movies})))
    })

    app.put(movies,async (req,res) => {
        let jsonobject = req.body
        updateMovie(new Movie(jsonobject.name,jsonobject.releaseDate,jsonobject.starRating,jsonobject.rating))
        let movies = await getAllMovies()
        res.send(JSON.parse(JSON.stringify({movies})))
    })

    app.post(movies,async (req,res) => {
        let jsonobject = req.body
        await postMovie(new Movie(jsonobject.name,jsonobject.releaseDate,jsonobject.starRating,jsonobject.rating))
        let movies = await getAllMovies()
        res.send(JSON.parse(JSON.stringify({movies})))
    })
    
    app.delete(moviesById,async (req,res) => {
        let movieName = req.params.name
        await deleteMovieByName(movieName)
        let movies = await getAllMovies()
        res.send(JSON.parse(JSON.stringify({movies})))
    })
}

function handleSeriesEndpoint(req,res){
    if(req.method === "GET"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        res.end(JSON.stringify({seriesList}))
    }else if(req.method === "POST" || req.method === "PUT"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        seriesList.push(new Series("Prison break","11.11.2004",9,16))
        res.end(JSON.stringify({seriesList}))
    }else if(req.method === "DELETE"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        seriesList.pop()
        res.end(JSON.stringify({seriesList}))
    }
}

function handleSongsEndpoint(req,res){
    if(req.method === "GET"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        res.end(JSON.stringify({songsList}))
    }else if(req.method === "POST" || req.method === "PUT"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        songsList.push(new Song("Shake ah","Tyla","Amapiano",3000000))
        res.end(JSON.stringify({songsList}))
    }else if(req.method === "DELETE"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        songsList.pop()
        res.end(JSON.stringify({songsList}))
    }
}


app.listen(port,() => {
    console.log("listening!!")
})