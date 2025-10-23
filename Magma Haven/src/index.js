import express, { urlencoded } from "express";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import routes from "./routes.js";
import setTilte from "./utils/pageHelper.js";
import checkAuth from "./middlewares/authentication.js";
import countHelper from "./utils/countHelper.js";

const app = express();
const url = "mongodb://localhost:27017";

try {
    mongoose.connect(url, { dbName: "practising" });
    console.log("Succssesfully connected to DB");
} catch (err) {
    console.log("Can not connect to the DB");
    console.log(err);
}

app.use(express.static("public"));

app.use(urlencoded());

app.use(cookieParser());

app.use(checkAuth);

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,
        },
        helpers: { ...setTilte, ...countHelper },
    })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(routes);

app.listen(
    3000,
    console.log("Server is listening on: http://localhost:3000...")
);
