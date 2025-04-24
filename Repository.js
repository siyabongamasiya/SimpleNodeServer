import fs from 'node:fs/promises'
import { Movie, Series, Song } from './Models.js'

const DB_PATH = './Database.json'

// Check if file exists
export const checkIfFileExists = async () => {
    try {
        await fs.access(DB_PATH)
        return true
    } catch (error) {
        const initialData = {
            movies: [],
            series: [],
            songs: []
        }
        await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2))
        return false
    }
}

// Add movie
export const addMovie = async (movie) => {
    const data = await getAllMovies()
    data.push(movie)
    const allData = await getAllData()
    allData.movies = data
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return movie
}

// Delete movie by name
export const deleteMovieByName = async (name) => {
    const data = await getAllMovies()
    const filtered = data.filter(m => m.name !== name)
    const allData = await getAllData()
    allData.movies = filtered
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return filtered
}

// Post movie
export const postMovie = async (movieData) => {
    const data = await getAllMovies()
    const newMovie = { ...movieData }
    data.push(newMovie)
    const allData = await getAllData()
    allData.movies = data
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return newMovie
}

// Update movie
export const updateMovie = async (movie) => {
    const data = await getAllMovies()
    const index = data.findIndex(m => m.name === movie.name)
    if (index !== -1) {
        data[index] = movie
        const allData = await getAllData()
        allData.movies = data
        await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
        return movie
    } else {
        return null
    }
}

// Get all movies
export const getAllMovies = async () => {
    try {
        const raw = await fs.readFile(DB_PATH, 'utf-8')
        const data = JSON.parse(raw)
        return data.movies || []
    } catch (err) {
        return []
    }
}

// Get movie by name
export const getMovieByName = async (name) => {
    const data = await getAllMovies()
    return data.find(m => m.name === name)
}

// SERIES

export const getAllSeries = async () => {
    const data = await getAllData()
    return data.series || []
}

export const getSeriesByName = async (name) => {
    const data = await getAllSeries()
    return data.find(s => s.name === name)
}

export const addSeries = async (series) => {
    const data = await getAllSeries()
    data.push(series)
    const allData = await getAllData()
    allData.series = data
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return series
}

export const deleteSeriesByName = async (name) => {
    const data = await getAllSeries()
    const filtered = data.filter(s => s.name !== name)
    const allData = await getAllData()
    allData.series = filtered
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return filtered
}

export const postSeries = async (seriesData) => {
    const data = await getAllSeries()
    const newSeries = { ...seriesData }
    data.push(newSeries)
    const allData = await getAllData()
    allData.series = data
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return newSeries
}

export const updateSeries = async (series) => {
    const data = await getAllSeries()
    const index = data.findIndex(s => s.name === series.name)
    if (index !== -1) {
        data[index] = series
        const allData = await getAllData()
        allData.series = data
        await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
        return series
    } else {
        return null
    }
}

// SONGS

export const getAllSongs = async () => {
    const data = await getAllData()
    return data.songs || []
}

export const getSongByName = async (name) => {
    const data = await getAllSongs()
    return data.find(s => s.name === name)
}

export const addSong = async (song) => {
    const data = await getAllSongs()
    data.push(song)
    const allData = await getAllData()
    allData.songs = data
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return song
}

export const deleteSongByName = async (name) => {
    const data = await getAllSongs()
    const filtered = data.filter(s => s.name !== name)
    const allData = await getAllData()
    allData.songs = filtered
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return filtered
}

export const postSong = async (songData) => {
    const data = await getAllSongs()
    const newSong = { ...songData }
    data.push(newSong)
    const allData = await getAllData()
    allData.songs = data
    await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
    return newSong
}

export const updateSong = async (song) => {
    const data = await getAllSongs()
    const index = data.findIndex(s => s.name === song.name)
    if (index !== -1) {
        data[index] = song
        const allData = await getAllData()
        allData.songs = data
        await fs.writeFile(DB_PATH, JSON.stringify(allData, null, 2))
        return song
    } else {
        return null
    }
}

// Shared read
const getAllData = async () => {
    try {
        const raw = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(raw)
    } catch (err) {
        return { movies: [], series: [], songs: [] }
    }
}