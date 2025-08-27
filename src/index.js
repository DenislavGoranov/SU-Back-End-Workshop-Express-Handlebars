import express from "express";
import handlebars from "express-handlebars";
import homeController from "./services/homeController.js";
import createController from "./services/createController.js";

const app = express();

app.use(express.static("./src/static"));

app.engine("hbs", handlebars.engine({ extname: "hbs" }));

app.set("view engine", "hbs");

app.set("views", "./src/views");

app.use(homeController);
app.use(createController);

app.get("/search", (req, res) => {
    res.render("search");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
