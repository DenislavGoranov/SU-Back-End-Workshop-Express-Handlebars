import express from "express";

const errorController = express.Router();

errorController.get("*url", (req, res) => {
    res.render("404");
});

export default errorController;
