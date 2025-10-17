import express from "express";
import handlebars from "express-handlebars";

import routes from "./routes.js";

const app = express();

app.use(express.static("public"));

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
app.set("views", "src/views");

app.use(routes);

app.listen(
    3000,
    console.log("Server is listening on: http://localhost:3000...")
);
