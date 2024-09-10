//require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const Data = require("./Schema");
const GetTime = require("./func")
const { v4: uuid } = require("uuid")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "/views"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))

const uri = process.env.MONGO_URI || "mongodb://localhost:27017/test";
const port = process.env.PORT || 3000;

mongoose.connect(uri)
    .then(async () => {
        console.log("CONNECTED TO MONGODB!!")
    })
    .catch(err => console.log(err))

app.listen(port, () => console.log("APP CONNECTED"))

app.get("/comments", async (req, res) => {
    const allcomments = await Data.find({}).sort({ date: -1 });
    res.render("index", { allcomments })
})

app.get("/comments/new", (req, res) => {
    res.render("new")
})

app.get("/comments/:id", async (req, res) => {
    const { id } = req.params;
    const comment = await Data.findById(id);
    res.render("details", { comment })
})

app.get("/comments/:id/edit", async (req, res) => {
    const { id } = req.params;
    const comment = await Data.findById(id)
    res.render("edit", { comment })
})

app.post("/comments", async (req, res) => {
    const { name, comment } = req.body;
    const newData = new Data({ _id: uuid(), name: name, comment: comment, date: { created: GetTime() } })
    await newData.save()
    res.redirect(`/comments/${newData._id}`)
})

app.put("/comments/:id", async (req, res) => {
    const { name, comment } = req.body;
    const { id } = req.params
    const editTime = GetTime()
    await Data.findByIdAndUpdate(
        id,
        {
            $set: {
                name: name,
                comment: comment,
                'date.edited': editTime
            }
        })

    const test = await Data.findById(id)
    res.redirect(`/comments/${id}`)
})

app.delete("/comments/:id", async (req, res) => {
    const { id } = req.params;
    await Data.findByIdAndDelete(id)
    res.redirect("/comments")
})
