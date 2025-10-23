import express from "express";
import handlebars from "express-handlebars";

import routes from "./routes.js";
import initDatabase from "./config/dbConfing.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authmiddleware.js";
import globalErrorHandler from "./middlewares/errorHandlerMiddleware.js";
import helpers from "./helpers/index.js";

const app = express();

initDatabase();

app.use(express.static("public"));

app.use(cookieParser());

app.use(express.urlencoded());

app.engine(
    "hbs",
    handlebars.engine({
        extname: "hbs",
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true,
        },
        helpers,
    })
);

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(authMiddleware);

app.use(routes);

app.use(globalErrorHandler);
//todo check the corect port for the server
app.listen(
    3000,
    console.log("Server is listening on http://localhost:3000...")
);
