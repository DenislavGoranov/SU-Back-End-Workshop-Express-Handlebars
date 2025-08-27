import express from "express";

const aboutController = express.Router();

aboutController.get("/about", (req, res) => {
    res.render("about");
});

export default aboutController;
