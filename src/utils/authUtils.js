import movieService from "../services/movieService.js";

export const isTheOwner = async (movieId, userId) => {
    const movie = await movieService.getSpecificOne(movieId);
    const movieOwnerId = movie.owner;
    let result = false;

    if (userId == movieOwnerId) {
        result = true;
    }

    return result;
};
