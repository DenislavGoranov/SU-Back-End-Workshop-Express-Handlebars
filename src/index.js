import express from "express";
import handlebars from "express-handlebars";
import homeController from "./controllers/homeController.js";
import createController from "./controllers/createController.js";
import searchController from "./controllers/searchController.js";
import aboutController from "./controllers/aboutController.js";
import errorController from "./controllers/errorController.js";
import detailsController from "./controllers/detailsController.js";

const app = express();

app.use(express.static("./src/static"));

app.engine("hbs", handlebars.engine({ extname: "hbs" }));

app.set("view engine", "hbs");

app.set("views", "./src/views");

app.use(homeController);
app.use(createController);
app.use(searchController);
app.use(aboutController);
app.use(errorController);
app.use(detailsController);

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
