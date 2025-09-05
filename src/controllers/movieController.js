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

    try {
        await movieService.create(movieData, userId);
        res.redirect("/");
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;

    try {
        const movies = await movieService.getAll(filter);
        res.render("search", { movies, title: "Search Page" });
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.get("/details/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const movie = await movieService.getSpecificOne(movieId);
        const { id } = req?.user || {};
        const isOwner = movie.owner == id;

        const casts = movie.casts;

        res.render("details", { movie, casts, isOwner, title: "Details" });
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.get("/attach/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    try {
        const movie = await movieService.getSpecificOne(movieId);

        const isOwner = await isTheOwner(movieId, userId);

        if (!isOwner) {
            return res.redirect("/404");
        }

        const excludeIds = movie.casts.map((c) => c._id);

        const casts = await castService.getAllWithFilter({
            exclude: excludeIds,
        });

        res.render("./cast/attach", { movie, casts, title: "Attach" });
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.post("/attach/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    try {
        await movieService.attach(movieId, castId);

        res.redirect(`/movie/${movieId}/details`);
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.get("/edit/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;
    try {
        const movie = await movieService.getSpecificOne(movieId);
        const isOwner = await isTheOwner(movieId, userId);

        if (!isOwner) {
            return res.redirect("/404");
        }

        res.render("edit", { movie, title: "Edit" });
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.post("/edit/:movieId", isAuth, async (req, res) => {
    const newData = req.body;
    const movieId = req.params.movieId;

    try {
        await movieService.update(movieId, newData);

        res.redirect(`/movie/edit/${movieId}`);
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

movieController.get("/delete/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    try {
        const isOwner = await isTheOwner(movieId, userId);

        if (!isOwner) {
            return res.redirect("/404");
        }

        await movieService.delete(movieId);

        res.redirect("/");
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

export default movieController;
