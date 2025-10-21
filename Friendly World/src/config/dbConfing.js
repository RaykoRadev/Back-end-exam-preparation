import mongoose from "mongoose";

async function initDatabase() {
    const dbUrl = `mongodb://localhost:27017`;

    const dbName = "practising";
    try {
        await mongoose.connect(dbUrl, { dbName });
        console.log("DB connected succssesfully");
    } catch (err) {
        console.log("Db connection faild");
        console.log(err.message);
    }
}

export default initDatabase;
