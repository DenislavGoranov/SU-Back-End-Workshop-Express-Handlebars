import express from "express";

const userController = express.Router();

userController.get("/register", async (req, res) => {
    res.render("user/register", { title: "Register" });
});

userController.get("/login", (req, res) => {
    res.render("user/login", { title: "Login" });
});

export default userController;
