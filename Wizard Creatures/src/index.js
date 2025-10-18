import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("work");
});

app.listen(3000, console.log("Server is working on http://localhost:3000"));
