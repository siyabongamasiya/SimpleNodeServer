import http from 'node:http';
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { Movie,Series,Song } from './Models.js';
import { getAllMovies,
    getMovieByName,
    deleteMovieByName,
    updateMovie,
    postMovie,
    getAllSeries,
    getSeriesByName,
    deleteSeriesByName,
    updateSeries,
    postSeries,
    getAllSongs,
    getSongByName,
    deleteSongByName,
    updateSong,
    postSong,
    checkIfFileExists} from './Repository.js';

const hostname = "127.0.0.1"
const port = 3000
const app = express()

app.use(express.json())

//endpoints
const movies = "/Movies"
const moviesById = "/Movies/:name"
const series = "/Series"
const seriesById = "/Series/:name"
const songs = "/Songs"
const songsById = "/Songs/:name"


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/documentation.html"));
});
handleMoviesEndpoint()
handleSeriesEndpoint()
handleSongsEndpoint()

function handleMoviesEndpoint(){
    app.get(movies,async (req,res)=>{
        let movieName = req.query.name
        if(movieName){
            let foundMovie = await getMovieByName(movieName)
            res.send(JSON.parse(JSON.stringify({foundMovie})))
        }else{
            let movies = await getAllMovies()
            res.send(JSON.parse(JSON.stringify({movies})))
        }
        
    })

    app.put(movies,async (req,res) => {
        let jsonobject = req.body
        await updateMovie(new Movie(jsonobject.name,jsonobject.releaseDate,jsonobject.starRating,jsonobject.rating))
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

function handleSeriesEndpoint() {
    app.get(series, async (req, res) => {
        let seriesName = req.query.name
        if (seriesName) {
            let foundSeries = await getSeriesByName(seriesName)
            res.send(JSON.parse(JSON.stringify({ foundSeries })))
        } else {
            let allSeries = await getAllSeries()
            res.send(JSON.parse(JSON.stringify({ allSeries })))
        }
    })

    app.put(series, async (req, res) => {
        let json = req.body
        await updateSeries(new Series(json.name, json.season, json.starRating, json.rating))
        let allSeries = await getAllSeries()
        res.send(JSON.parse(JSON.stringify({ allSeries })))
    })

    app.post(series, async (req, res) => {
        let json = req.body
        await postSeries(new Series(json.name, json.season, json.starRating, json.rating))
        let allSeries = await getAllSeries()
        res.send(JSON.parse(JSON.stringify({ allSeries })))
    })

    app.delete(seriesById, async (req, res) => {
        let name = req.params.name
        await deleteSeriesByName(name)
        let allSeries = await getAllSeries()
        res.send(JSON.parse(JSON.stringify({ allSeries })))
    })
}

function handleSongsEndpoint() {
    app.get(songs, async (req, res) => {
        let songName = req.query.name
        if (songName) {
            let foundSong = await getSongByName(songName)
            res.send(JSON.parse(JSON.stringify({ foundSong })))
        } else {
            let allSongs = await getAllSongs()
            res.send(JSON.parse(JSON.stringify({ allSongs })))
        }
    })

    app.put(songs, async (req, res) => {
        let json = req.body
        await updateSong(new Song(json.name, json.artist, json.genre, json.noOfStreams))
        let allSongs = await getAllSongs()
        res.send(JSON.parse(JSON.stringify({ allSongs })))
    })

    app.post(songs, async (req, res) => {
        let json = req.body
        await postSong(new Song(json.name, json.artist, json.genre, json.noOfStreams))
        let allSongs = await getAllSongs()
        res.send(JSON.parse(JSON.stringify({ allSongs })))
    })

    app.delete(songsById, async (req, res) => {
        let name = req.params.name
        await deleteSongByName(name)
        let allSongs = await getAllSongs()
        res.send(JSON.parse(JSON.stringify({ allSongs })))
    })
}


app.listen(port,() => {
    console.log("listening!!")
    checkIfFileExists()
})