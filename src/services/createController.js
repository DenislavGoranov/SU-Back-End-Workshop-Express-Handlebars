import express from "express";

const createController = express.Router();

createController.get("/create", (req, res) => {
    res.render("create");
});

export default createController;
