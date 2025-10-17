import express from "express";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("it wokrks");
});

app.listen(
    3000,
    console.log("Server is listening on: http://localhost:3000...")
);
