import express from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";

import routes from "./routes.js";
import setTitle from "./utils/dynamicTitle.js";

const app = express();
const url = "mongodb://localhost:27017";

try {
    mongoose.connect(url, { dbName: "practising" });
    console.log("Succssesful connected to DB");
} catch (err) {
    console.log("Cannot connect to DB");
    console.log(err);
}

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,
        },
        helpers: { setTitle },
    })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.static("public"));
app.use(express.urlencoded());

app.use(routes);

app.listen(3000, console.log("Server is working on http://localhost:3000"));
