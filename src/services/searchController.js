import express from "express";

const searchController = express.Router();

searchController.get("/search", (req, res) => {
    res.render("search");
});

export default searchController;
