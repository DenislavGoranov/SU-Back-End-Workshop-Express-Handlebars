import express from "express";

import userService from "../services/userService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
const userController = express.Router();

userController.get("/register", async (req, res) => {
    res.render("user/register", { title: "Register" });
});

userController.post("/register", async (req, res) => {
    const userData = req.body;

    try {
        const token = await userService.register(userData);

        res.cookie("auth", token);

        res.redirect("/");
    } catch (err) {
        res.render("user/register", {
            email: userData.email,
            error: getErrorMessage(err),
        });
    }
});

userController.get("/login", (req, res) => {
    res.render("user/login", { title: "Login" });
});

userController.post("/login", async (req, res) => {
    const userData = req.body;

    try {
        const token = await userService.login(userData);

        res.cookie("auth", token);

        res.redirect("/");
    } catch (err) {
        res.render("user/login", {
            email: userData.email,
            error: getErrorMessage(err),
        });
    }
});

userController.get("/logout", isAuth, (req, res) => {
    try {
        res.clearCookie("auth");

        res.redirect("/");
    } catch (err) {
        res.render("404", { error: getErrorMessage(err) });
    }
});

export default userController;
