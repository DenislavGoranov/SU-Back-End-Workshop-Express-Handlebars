import express from "express";
import movieServise from "../services/movieServise.js";

const movieController = express.Router();

movieController.get("/create", (req, res) => {
    res.render("create");
});

movieController.get("/search", (req, res) => {
    res.render("search");
});

movieController.get("/about", (req, res) => {
    res.render("about");
});

movieController.get("/:movieId/details", async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieServise.getSpecificOne(movieId);

    res.render("details", { movie });
});

movieController.get("*url", (req, res) => {
    res.render("404");
});

export default movieController;
