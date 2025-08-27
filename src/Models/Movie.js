import fs from "node:fs/promises";

export default class Movie {
    constructor(data) {
        this.data = data;
    }

    static async find() {
        const moviesJson = await fs.readFile("./src/database.json");
        const movies = JSON.parse(moviesJson);

        return movies;
    }
}
