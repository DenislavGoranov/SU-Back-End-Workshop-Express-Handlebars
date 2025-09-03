import express from "express";
import userService from "../services/userService.js";
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

export default userController;
