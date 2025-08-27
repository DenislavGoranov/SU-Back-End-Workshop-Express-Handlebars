import Movie from "../Models/Movie.js";

const movieServise = {
    async getAll() {
        const result = await Movie.find();

        return result;
    },

    async getSpecificOne(movieId) {
        const result = await Movie.getOne(movieId);

        return result;
    },

    async create(movieData) {
        const movie = new Movie(movieData);
        await movie.save();

        return movieData;
    },
};

export default movieServise;
