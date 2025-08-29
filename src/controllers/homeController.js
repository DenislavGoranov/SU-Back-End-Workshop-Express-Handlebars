import express from "express";
import movieServise from "../services/movieService.js";
const homeController = express.Router();

homeController.get("/", async (req, res) => {
    const movies = await movieServise.getAll();

    res.render("home", { movies });
});

export default homeController;
