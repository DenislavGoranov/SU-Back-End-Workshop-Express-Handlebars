import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";

const app = express();

app.use(express.static("./src/static"));
app.use(express.urlencoded());

app.engine("hbs", handlebars.engine({ extname: "hbs" }));

app.set("view engine", "hbs");

app.set("views", "./src/views");

app.use(homeController);
app.use(movieController);

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
