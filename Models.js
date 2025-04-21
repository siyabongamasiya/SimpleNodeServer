export class Movie{
    constructor(name,releaseDate,starRating,rating){
        this.name = name
        this.releaseDate = releaseDate
        this.starRating = starRating
        this.rating = rating
    }
}

export class Series{
    constructor(name,season,starRating,rating){
        this.name = name
        this.season = season
        this.starRating = starRating
        this.rating = rating
    }
}

export class Song{
    constructor(name,artist,genre,noOfStreams){
        this.name = name
        this.artist = artist
        this.genre = genre
        this.noOfStreams = noOfStreams
    }
}