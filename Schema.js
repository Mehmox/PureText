const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    date: {
        created: {
            type: String,
            required: true,
        },
        edited: {
            type: String,
        }
    },
})

const data = mongoose.model("Comment", commentSchema)

module.exports = data