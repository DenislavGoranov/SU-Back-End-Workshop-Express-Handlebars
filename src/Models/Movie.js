import fs from "node:fs/promises";
import { v4 as uuid } from "uuid";
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
    async save() {
        this.data.id = uuid();

        this.data.rating = Number(this.data.rating);

        movies.push(this.data);

        await fs.writeFile(
            "./src/database.json",
            JSON.stringify(movies, null, 4)
        );

        return this.data;
    }
}
