import express from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = express.Router();

movieController.get("/create", (req, res) => {
    res.render("create", { title: "Add Movie" });
});

movieController.post("/create", async (req, res) => {
    const userId = req.user.id;
    const movieData = req.body;
    await movieService.create(movieData, userId);

    res.redirect("/");
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;

    const movies = await movieService.getAll(filter);

    res.render("search", { movies, title: "Search Page" });
});

movieController.get("/details/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getSpecificOne(movieId);
    const casts = movie.casts;

    res.render("details", { movie, casts, title: "Details" });
});

movieController.get("/attach/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getSpecificOne(movieId);

    const excludeIds = movie.casts.map((c) => c._id);

    const casts = await castService.getAllWithFilter({
        exclude: excludeIds,
    });

    res.render("./cast/attach", { movie, casts, title: "Attach" });
});

movieController.post("/attach/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/details`);
});

movieController.get("/edit/:movieId", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getSpecificOne(movieId);

    res.render("edit", { movie, title: "Edit" });
});

movieController.post("/edit/:movieId", async (req, res) => {
    const newData = req.body;

    const movieId = req.params.movieId;

    await movieService.update(movieId, newData);

    res.redirect(`/movie/edit/${movieId}`);
});

export default movieController;
