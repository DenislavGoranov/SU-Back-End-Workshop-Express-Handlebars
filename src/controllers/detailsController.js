import express from "express";

const detailsController = express.Router();

detailsController.get("/details/:movieId", (req, res) => {
    const movieId = req.params.movieId;

    res.render("details");
});

export default detailsController;
