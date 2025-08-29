import express from "express";

const castController = express.Router();

castController.get("/create", (req, res) => {
    res.render("./cast/create");
});

export default castController;
