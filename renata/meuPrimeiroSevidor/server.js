const express = require("express")
const app = express()

app.get("/", (request, response) => {
    response.status(200).json(["Salve, Salve, Meuuuuu Rei!"])
})

app.get("/hello", (request, response) => {
    response.status(200).json(["Hello, hello, Hello"])
})

app.get("/bye", (request, response) => {
    response.status(200).json("Tchau, tchauzinho")
})

app.listen(8080, () => {
    console.log("Meu servidor está rodanbdo na porta 8080, graças a Deus!!!!")
})