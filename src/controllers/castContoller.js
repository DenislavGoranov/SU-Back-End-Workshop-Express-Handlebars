import express from "express";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const castController = express.Router();

castController.get("/create", isAuth, (req, res) => {
    res.render("./cast/create", { title: "Add Cast" });
});

castController.post("/create", isAuth, async (req, res) => {
    const castData = req.body;

    try {
        await castService.create(castData);

        res.redirect("/");
    } catch (err) {
        res.render("404", { error: err.message });
    }
});

export default castController;
