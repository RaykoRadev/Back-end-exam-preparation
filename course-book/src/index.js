import express from "express";
import routers from "./routes.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import isAuthenticated from "./middleware/isAuthenticated.js";
import pageTitle from "./helpers/pageTitle.js";

const app = express();

const url = "mongodb://localhost:27017";

try {
    await mongoose.connect(url, { dbName: "practising" });
} catch (err) {
    console.log("Somting went wrong with the DB :(", err.message);
}

app.use(express.static("public"));
app.use(express.urlencoded());
app.use(cookieParser());

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        },
        helpers: { ...pageTitle },
    })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(isAuthenticated);

app.use(routers);

app.listen(3000, console.log("Server is lestening on port 3000..."));
