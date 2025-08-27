import express from "express";
import movieServise from "../services/movieServise.js";

const detailsController = express.Router();

detailsController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);
    console.log(movie);

    res.render("details", { movie });
});

export default detailsController;
