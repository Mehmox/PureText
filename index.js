require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.static(path.join(__dirname, "public")))

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
// const uri = "mongodb://localhost:27017/test";
// console.log(uri)
const port = process.env.PORT || 3000;

mongoose.connect(uri)
    .then(() => console.log("CONNECTED TO MONGODB!!"))
    .catch(err => console.log(err))

const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
})

const data = mongoose.model("Comment", commentSchema)
app.listen(port, () => console.log("APP CONNECTED"))

app.get("/", async (req, res) => {
    const newData = await data({
        name: "Mehmox",
        comment: "Here has no protection about chat filter pls choose your word carefully",
        date: GetTime(),
    })
    const starter = await data({
        name: "Mehmox",
        comment: "Here has no protection about chat filter pls choose your word carefully",
        date: "10/09/2024 20:06:05",
    })

    // await data.deleteMany()
    // await newData.save()
    const allcomments = await data.find({})
    res.render("index", { allcomments })
})

function GetTime() {
    const currentTime = new Date();
    const Day = currentTime.getDate().toString().padStart(2, '0');
    const Month = (currentTime.getMonth() + 1).toString().padStart(2, '0');
    const Year = currentTime.getFullYear();
    const Hour = currentTime.getHours().toString().padStart(2, '0');
    const Minute = currentTime.getMinutes().toString().padStart(2, '0');
    const Second = currentTime.getSeconds().toString().padStart(2, '0');
    return `${Day}/${Month}/${Year} ${Hour}:${Minute}:${Second}`;
}
function test() {
    const now = new Date();
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    console.log(formattedTime)
}