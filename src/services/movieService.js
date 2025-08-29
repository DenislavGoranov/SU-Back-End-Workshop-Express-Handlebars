import Movie from "../Models/Movie.js";

const movieServise = {
    async getAll(filter = {}) {
        let result = await Movie.find();
        if (filter.title) {
            result = result.filter((movie) =>
                movie.title.toLowerCase().includes(filter.title.toLowerCase())
            );
        }

        if (filter.genre) {
            result = result.filter((movie) =>
                movie.genre.toLowerCase().includes(filter.genre.toLowerCase())
            );
        }
        if (filter.year) {
            result = result.filter((movie) => movie.year === filter.year);
        }
        return result;
    },

    async getSpecificOne(movieId) {
        const result = await Movie.findById(movieId).lean();
        return result;
    },

    async create(movieData) {
        const movie = new Movie(movieData);
        await movie.save();

        return movieData;
    },
};

export default movieServise;
