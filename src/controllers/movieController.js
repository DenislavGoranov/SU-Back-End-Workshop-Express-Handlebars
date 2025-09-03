import express from "express";
import movieServise from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = express.Router();

movieController.get("/create", (req, res) => {
    res.render("create", { title: "Add Movie" });
});

movieController.post("/create", async (req, res) => {
    const userId = req.user.id;
    const movieData = req.body;
    await movieServise.create(movieData, userId);

    res.redirect("/");
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;

    const movies = await movieServise.getAll(filter);

    res.render("search", { movies, title: "Search Page" });
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);
    const casts = movie.casts;

    res.render("details", { movie, casts, title: "Details" });
});

movieController.get("/attach/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);

    const excludeIds = movie.casts.map((c) => c._id);

    const casts = await castService.getAllWithFilter({
        exclude: excludeIds,
    });

    res.render("./cast/attach", { movie, casts, title: "Attach" });
});

movieController.get("/edit/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);

    res.render("cast/edit", { movie, title: "Edit" });
});

movieController.post("/cast/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieServise.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/details`);
});

export default movieController;
