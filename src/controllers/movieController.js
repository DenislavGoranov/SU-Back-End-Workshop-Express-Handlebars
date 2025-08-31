import express from "express";
import movieServise from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = express.Router();

movieController.get("/create", (req, res) => {
    res.render("create");
});

movieController.post("/create", async (req, res) => {
    const movieData = req.body;
    await movieServise.create(movieData);

    res.redirect("/");
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;

    const movies = await movieServise.getAll(filter);

    res.render("search", { movies });
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);
    const çasts = movie.casts;
    console.log(çasts);

    res.render("details", { movie, çasts });
});

movieController.get("/cast/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);

    const excludeIds = movie.casts.map((c) => c._id);

    const casts = await castService.getAllWithFilter({
        exclude: excludeIds,
    });
    console.log(casts);

    res.render("./cast/attach", { movie, casts });
});

movieController.post("/cast/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieServise.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/details`);
});

export default movieController;
