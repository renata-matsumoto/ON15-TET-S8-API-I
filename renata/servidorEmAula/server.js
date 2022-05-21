const filmesJson = require("./data/ghibli.json")

const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json()) //faz o body parser - parseando o json no post(ele transforma tudo oq vier em json)


app.get("/", (request, response) => {
    response.status(200).json([
        {
            "mensagem" : "API de filmes Ghibli"
        }
    ])
})

app.get("/filmes", (request, response) => {
    response.status(200).send([filmesJson]) 
})

app.get("/filmes/buscar/:id", (request, response) => {
    // recuperando o valor do ID enviado na request
    let idRequest = request.params.id
    // Array.find(elemento => comparação == comparação)
    // encontre um filme dentro de filmes Json
    // que o ID do filme seja igual o ID do request
    let filmeEncontrado = filmesJson.find(filme => filme.id == idRequest)
    console.log(filmeEncontrado)
    response.status(200).send(filmeEncontrado)
    
})


//query params

app.get("/filmes/filtro", (request, response) => {
    let tituloRequest = request.query.titulo.toLowerCase()

    let filmeEncontrado = filmesJson.filter(filme => filme.title.toLowerCase().includes(tituloRequest))

    response.status(200).send(filmeEncontrado)
})



app.post("/filmes/cadastrar", (request, response) => {
    let bodyRequest = request.body
  

    let novoFilme = {
        id: (filmesJson.length) + 1,
        title: bodyRequest.title,
        description: bodyRequest.description
    }
    filmesJson.push(novoFilme)

    response.status(201).send({
        "mensagem":"Filme Cadastrado com Sucesso lala", novoFilme})
    
})

app.listen(8080, () => {
    console.log("Alo, Xuxa")
})