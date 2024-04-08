const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userID: {
        type: Number,
        required: true,
        
    },
    name: {
        type: String,
        required: true
    },
    dept: {
        type: String,
        required: true
    }
});

const Student = mongoose.model("studentData02", studentSchema);

module.exports = { Student };