import express from "express";
import movieServise from "../services/movieService.js";
const homeController = express.Router();

homeController.get("/", async (req, res) => {
    try {
        const movies = await movieServise.getAll();
        res.render("home", { movies, title: "Home Page" });
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

export default homeController;
