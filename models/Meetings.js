const mongoose = require('mongoose')

const Meetings = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    Foto: {
        type: String,
        required: true
    },
    colaboradores: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
})

mongoose.model('meetings', Meetings)