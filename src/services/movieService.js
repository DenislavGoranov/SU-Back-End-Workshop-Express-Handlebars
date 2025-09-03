import Movie from "../Models/Movie.js";

const movieService = {
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
        const result = await Movie.findById(movieId).populate("casts").lean();
        return result;
    },

    async create(movieData, userId) {
        const movie = new Movie(movieData);

        movie.owner = userId;

        await movie.save();

        return movieData;
    },
    async attach(movieId, castId) {
        const movie = await Movie.findById(movieId);

        movie.casts.push(castId);
        return movie.save();
    },
};

export default movieService;
