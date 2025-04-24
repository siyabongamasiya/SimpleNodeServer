import fs from 'node:fs/promises'
import { Movie } from './Models.js'

const DB_PATH = './Database.json'

export const checkIfFileExists = async () => {
    try {
        await fs.access(DB_PATH)
        return true
    } catch (error) {
        return false
    }
}


export const addMovie = async (movie) => {
    const data = await getAllMovies()
    data.push(movie)
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    return movie
}


export const deleteMovieByName = async (name) => {
    const data = await getAllMovies()
    const filtered = data.filter(m => m.name !== name)
    await fs.writeFile(DB_PATH, JSON.stringify(filtered, null, 2))
    return filtered
}


export const postMovie = async (movieData) => {
    const data = await getAllMovies()
    const newMovie = {...movieData }
    data.push(newMovie)
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    return newMovie
}


export const updateMovie = async (movie) => {
    const data = await getAllMovies()
    const index = data.findIndex(m => m.name === movie.name)
    if (index !== -1) {
        data[index] = movie
        await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
        return movie
    } else {
        return null
    }
}


export const getAllMovies = async () => {
    try {
        const data = await fs.readFile(DB_PATH, 'utf-8')
        return JSON.parse(data)
        
    } catch (err) {
        console.log(data)
        return []
    }
}


export const getMovieByName = async (name) => {
    const data = await getAllMovies()
    return data.find(m => m.name === name)
}