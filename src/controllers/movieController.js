import express from "express";
import movieServise from "../services/movieService.js";

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

    res.render("details", { movie });
});

movieController.get("*url", (req, res) => {
    res.render("404");
});

export default movieController;
