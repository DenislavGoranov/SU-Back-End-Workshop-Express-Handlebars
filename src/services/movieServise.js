import Movie from "../Models/Movie.js";

const movieServise = {
    async getAll() {
        const result = await Movie.find();

        return result;
    },
};

export default movieServise;
