import mongoose from "mongoose";

async function initDatabase() {
    const dbUrl = `mongodb://localhost:27017`;
    //todo change the name acording the exam needs
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
