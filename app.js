const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('./models/Meetings')
const Meetings = mongoose.model('meetings')

const app = express();

app.use(express.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    res.header("Access-Control-Allow-Headers", "*")
    next()
})

mongoose.connect('mongodb://localhost/meetings', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com o mongoDB realizada com sucesso!")
}).catch((erro) => {
    console.log("Erro: A Conexão com o mongoDB não foi realizada com suecesso!")
})

//Listar todos do bd
app.get("/meetings", (req, res) => {
    Meetings.find({}).then((meetings) => {
        return res.json(meetings)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum reunão cadastrada"
        })
    })
})

//Listar por id
app.get("/meetings/:id", (req, res) => {
    Meetings.findOne({ _id: req.params['id'] }).then((meetings) => {
        return res.json(meetings)
    }).catch((err) => {
        return res.status(400).json({
            error: true,
            messega: "Nenhuma Reunião encontrado por este ID!"
        })
    })
})

//Salvar no bd
app.post("/meetings", (req, res) => {
    const meetings = Meetings.create(req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error: Reunião não cadastrada!"
        })
        return res.status(200).json({
            error: false,
            message: "Reunião cadastrada com sucesso!"
        })
    })
})

//Editar no bd
app.put("/meetings/:id", (req, res) => {
    const meetings = Meetings.updateOne({ _id: req.params.id }, req.body, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: 'Error ao editar esta reunião!'
        })

        return res.json({
            error: false,
            message: "Reunião edita com com sucesso!"
        })
    })
})

//Deletar do bd
app.delete("/meetings/:id", (req, res) => {
    const meetings = Meetings.deleteOne({ _id: req.params.id }, (err) => {
        if (err) return res.status(400).json({
            error: true,
            message: "Error ao excluir esta reunião!"
        })

        return res.json({
            error: false,
            message: "Reunião excluida com sucesso!"
        })
    })
})


app.listen(8080, () => {
    console.log("Servidor logado na porta 8080, http://localhost:8080")
})