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
};

export default movieServise;
