import express from "express";

import userService from "../services/userService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
const userController = express.Router();

userController.get("/register", async (req, res) => {
    res.render("user/register", { title: "Register" });
});

userController.post("/register", async (req, res) => {
    const userData = req.body;

    const token = await userService.register(userData);

    res.cookie("auth", token);

    res.redirect("/");
});

userController.get("/login", (req, res) => {
    res.render("user/login", { title: "Login" });
});

userController.post("/login", async (req, res) => {
    const userData = req.body;

    const token = await userService.login(userData);

    res.cookie("auth", token);

    res.redirect("/");
});

userController.get("/logout", isAuth, (req, res) => {
    res.clearCookie("auth");

    res.redirect("/");
});

export default userController;
