import express from "express";

const homeController = express.Router();

homeController.get("/", (req, res) => {
    res.render("home");
});

export default homeController;
