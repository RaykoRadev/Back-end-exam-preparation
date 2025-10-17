import express from "express";
import handlebars from "express-handlebars";

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

app.set("view engine", handlebars);
app.set("views", "src/views");

app.get("/", (req, res) => {
    res.send("it wokrks");
});

app.listen(
    3000,
    console.log("Server is listening on: http://localhost:3000...")
);
