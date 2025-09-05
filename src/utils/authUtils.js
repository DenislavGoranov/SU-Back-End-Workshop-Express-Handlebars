import movieService from "../services/movieService.js";

export const isOwner = async (movieId) => {
    const movie = await movieService.getSpecificOne(movieId);
    const userId = req.user.id;
    const movieOwnerId = movie.owner;

    if (userId !== movieOwnerId) {
        res.redirect("/404");
    }

    return;
};
