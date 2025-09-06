import express from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isTheOwner } from "../utils/authUtils.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { getCategoryOptionsViewData } from "../utils/movieUtils.js";

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
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.get("/search", async (req, res) => {
    const filter = req.query;

    try {
        const movies = await movieService.getAll(filter);
        res.render("search", { movies, title: "Search Page" });
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.get("/details/:movieId", async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const movie = await movieService.getSpecificOne(movieId);
        const userId = req.user?.id;

        const isOwner = isTheOwner(movie.owner, userId);

        const casts = movie.casts;

        res.render("details", {
            movie,
            casts,
            isOwner,
            title: "Details",
        });
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.get("/attach/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;
    try {
        const movie = await movieService.getSpecificOne(movieId);

        const isOwner = isTheOwner(movie.owner, userId);

        if (!isOwner) {
            throw new Error("Access denied!");
        }

        const excludeIds = movie.casts.map((c) => c._id);

        const casts = await castService.getAllWithFilter({
            exclude: excludeIds,
        });

        res.render("./cast/attach", { movie, casts, title: "Attach" });
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.post("/attach/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    try {
        await movieService.attach(movieId, castId);

        res.redirect(`/movie/${movieId}/details`);
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.get("/edit/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getSpecificOne(movieId);

        const userId = req.user.id;

        const isOwner = isTheOwner(movie.owner, userId);

        if (!isOwner) {
            throw new Error("Access denied!");
        }

        res.render("edit", {
            movie,
            title: "Edit",
            options: getCategoryOptionsViewData(movie.category),
        });
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.post("/edit/:movieId", isAuth, async (req, res) => {
    const newData = req.body;
    const movieId = req.params.movieId;

    try {
        await movieService.update(movieId, newData);

        res.redirect(`/movie/edit/${movieId}`);
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

movieController.get("/delete/:movieId", isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const userId = req.user.id;

    try {
        const movie = await movieService.getSpecificOne(movieId);

        const isOwner = isTheOwner(movie.owner, userId);

        if (!isOwner) {
            throw new Error("Access denied!");
        }

        await movieService.delete(movieId);

        res.redirect("/");
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

export default movieController;
