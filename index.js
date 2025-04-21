import http from 'node:http';
import { Movie,Series,Song } from './Models.js';

const hostname = "127.0.0.1"
const port = 3000

//database
const moviesList = [new Movie("Avengers","25.11.2012",10,13),new Movie("Avengers:Dooms day","25.11.2025",10,13)]
const seriesList = [new Series("Loki",2,9,13),new Series("She hulk",1,9,13),new Series("Batman",3,9,13)]
const songsList = [new Song("Versace","Migos","Hip hop",200000,new Song("Taylor Port Junkie","Rylo Rodriguez","Hip hop",1000000))]

//endpoints
const movies = "/Movies"
const series = "/Series"
const songs = "/Songs"

const server = http.createServer((req,res) => {
    try{
        if(req.url === movies){
            handleMoviesEndpoint(req,res)
        }else if(req.url === series){
            handleSeriesEndpoint(req,res)
        }else if(req.url === songs){
            handleSongsEndpoint(req,res)
        }else{
            res.statusCode = 404
            res.end()
        }
    }catch(e){
        res.statusCode = 500
        res.end()
    }
    
})

function handleMoviesEndpoint(req,res){
    if(req.method === "GET"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        res.end(JSON.stringify({moviesList}))
    }else if(req.method === "POST" || req.method === "PUT"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        moviesList.push(new Movie("Doctor Strange","11.11.2018",9,13))
        res.end(JSON.stringify({moviesList}))
    }else if(req.method === "DELETE"){
        res.statusCode = 200
        res.setHeader("content-type","application/json")
        moviesList.pop()
        res.end(JSON.stringify({moviesList}))
    }
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
server.listen(port,hostname,() => {
    console.log("server running!!")
})