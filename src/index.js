import express from "express";
import handlebars from "express-handlebars";

const app = express();

app.engine("hbs", handlebars.engine({ extname: "hbs" }));

app.set("view engine", "hbs");

app.set("views", "./src/views");

app.listen(5000, () =>
    console.log("The server is listening on http://localhost:5000...")
);
