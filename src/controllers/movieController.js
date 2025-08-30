import express from "express";
import movieServise from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = express.Router();

movieController.get("/movie/create", (req, res) => {
    res.render("create");
});

movieController.post("/movie/create", async (req, res) => {
    const movieData = req.body;
    await movieServise.create(movieData);

    res.redirect("/");
});

movieController.get("/movie/search", async (req, res) => {
    const filter = req.query;

    const movies = await movieServise.getAll(filter);

    res.render("search", { movies });
});

movieController.get("/about", (req, res) => {
    res.render("about");
});

movieController.get("/movie/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);
    const casts = await castService.getAllWithFilter({ exclude: movie.casts });
    res.render("details", { movie, casts });
});

movieController.get("/attach/cast/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);
    const casts = await castService.getAll();

    res.render("./cast/attach", { movie, casts });
});

movieController.post("/attach/cast/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieServise.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/details`);
});

export default movieController;
