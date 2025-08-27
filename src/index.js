import express from "express";
import handlebars from "express-handlebars";

const app = express();

app.use(express.static("./src/static"));

app.engine("hbs", handlebars.engine({ extname: "hbs" }));

app.set("view engine", "hbs");

app.set("views", "./src/views");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/create", (req, res) => {
    res.render("create");
});

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
