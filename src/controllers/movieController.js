import express from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isTheOwner } from "../utils/authUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const movieController = express.Router();

movieController.get("/create", isAuth, (req, res) => {
    res.render("create", { title: "Add Movie" });
});

movieController.post("/create", isAuth, async (req, res) => {
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

movieController.get("/details/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getSpecificOne(movieId);
    const { id } = req?.user || {};
    const isOwner = movie.owner == id;

    const casts = movie.casts;

    res.render("details", { movie, casts, isOwner, title: "Details" });
});

movieController.get("/attach/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getSpecificOne(movieId);
    const userId = req.user.id;

    const isOwner = await isTheOwner(movieId, userId);

    if (!isOwner) {
        return res.redirect("/404");
    }

    const excludeIds = movie.casts.map((c) => c._id);

    const casts = await castService.getAllWithFilter({
        exclude: excludeIds,
    });

    res.render("./cast/attach", { movie, casts, title: "Attach" });
});

movieController.post("/attach/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId);

    res.redirect(`/movie/${movieId}/details`);
});

movieController.get("/edit/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getSpecificOne(movieId);
    const userId = req.user.id;
    const isOwner = await isTheOwner(movieId, userId);

    if (!isOwner) {
        return res.redirect("/404");
    }

    res.render("edit", { movie, title: "Edit" });
});

movieController.post("/edit/:movieId", isAuth, async (req, res) => {
    const newData = req.body;

    const movieId = req.params.movieId;

    await movieService.update(movieId, newData);

    res.redirect(`/movie/edit/${movieId}`);
});

movieController.get("/delete/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    const isOwner = await isTheOwner(movieId, userId);

    if (!isOwner) {
        return res.redirect("/404");
    }

    await movieService.delete(movieId);

    res.redirect("/");
});

export default movieController;
