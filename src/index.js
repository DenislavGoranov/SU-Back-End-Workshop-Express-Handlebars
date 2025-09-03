import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";
import userController from "./controllers/userController.js";
import mongoose from "mongoose";
import castController from "./controllers/castContoller.js";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.static("./src/static"));

app.use(cookieParser());
app.use(express.urlencoded());
app.use(auth);

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,
        },
    })
);

app.set("view engine", "hbs");

app.set("views", "./src/views");

try {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "movie-magic-softuni",
    });
} catch (error) {
    console.log("Couldn't connect to the DB");
}

app.get("/about", (req, res) => {
    res.render("about", { title: "About Page" });
});
app.use("/", homeController);
app.use("/movie", movieController);
app.use("/casts", castController);
app.use("/user", userController);
app.get("*url", (req, res) => {
    res.render("404");
});

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
