import fs from "node:fs/promises";

const moviesJson = await fs.readFile("./src/database.json");
const movies = JSON.parse(moviesJson);

export default class Movie {
    constructor(data) {
        this.data = data;
    }

    static async find() {
        return movies;
    }

    static async getOne(movieId) {
        const movie = movies.find((movie) => movie.id === movieId);

        return movie;
    }
}
