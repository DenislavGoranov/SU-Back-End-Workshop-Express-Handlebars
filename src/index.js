import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";
import mongoose from "mongoose";
import castController from "./controllers/castContoller.js";

const app = express();

app.use(express.static("./src/static"));
app.use(express.urlencoded());

try {
    mongoose.connect("mongodb://localhost:27017", {
        dbName: "movie-magic-softuni",
    });
} catch (error) {
    console.log("Couldn't connect to the DB");
}

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

app.get("/about", (req, res) => {
    res.render("about", { title: "About Page" });
});

app.use("/", homeController);
app.use("/movie", movieController);
app.use("/casts", castController);

app.get("*url", (req, res) => {
    res.render("404");
});

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
