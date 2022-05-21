const filmesJson = require("./data/filmes.json")
const seriesJson = require("./data/series.json")

const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (request, response) => {
    response.status(200).json([
        {
            "mensagem": "Bem vindas ao ReprogramaFlix"
        }
    ])
})

app.get("/filmes", (request, response) => {
    response.status(200).send([filmesJson])
})

app.get("/filmes/buscar/:id", (request, response) => {
    let idFilmeRequest = request.params.id

    let filmeEncontrado = filmesJson.find(filme => filme.id == idFilmeRequest)

    response.status(200).send([filmeEncontrado])
})



app.get("/filmes/filtro", (request, response) => {
    let pesquisaRequest = request.query.genero.toLowerCase()
    console.log(pesquisaRequest)

    let filmeEncontrado = filmesJson.filter(filme => filme.Genre
        .toLowerCase()
        .includes(pesquisaRequest))
    console.log(filmeEncontrado)
    response.status(200).send(filmeEncontrado)


})


// uma tentativa de fazer uma pesquisa genérica
// app.get("/filmes/filtro", (request, response) => {
//     let pesquisaRequest = request.query.pesquisa.toLowerCase()
//         console.log(pesquisaRequest)

//     let filmeEncontrado = filmesJson.filter(filme => filme.toLowerCase().includes(pesquisaRequest))
//     console.log(filmeEncontrado)
//     response.status(200).send(filmeEncontrado)
// })

app.post("/filmes/cadastrar", (request, response) => {
    let bodyRequest = request.body

    let novoFilme = {
        id: (filmesJson.length) + 1,
        title: bodyRequest.title,
        year: bodyRequest.year,
        rated: bodyRequest.rated,
        released: bodyRequest.released,
        runtime: bodyRequest.runtime,
        genre: bodyRequest.genre,
        director: bodyRequest.director,
        writer: bodyRequest.writer,
        actors: bodyRequest.actors,
        plot: bodyRequest.plot,
        language: bodyRequest.language,
        country: bodyRequest.country,
        awards: bodyRequest.awards,
    }
    filmesJson.push(novoFilme)

    response.status(201).send({
        "mensagem": "Filme cadastrado com Sucesso", novoFilme
    })
})



app.get("/series", (request, response) => {
    response.status(200).send([seriesJson])
})

app.get("/series/buscar/:id", (request, response) => {
    let idSeriesRequest = request.params.id

    let serieEncontrada = seriesJson.find(serie => serie.id == idSeriesRequest)

    response.status(200).send(serieEncontrada)
})

app.post("series/cadastrar", (request, response) => {
    let bodyRequest = request.body

    let novaSerie = {
        id: (seriesJson.length) + 1,
        title: bodyRequest.title,
        totalseasons: bodyRequest.totalseasons,
        genre: bodyRequest.genre,
        writers: bodyRequest.writers,
        poster: bodyRequest.poster,
        actors: bodyRequest.actors,
        ratings: bodyRequest.ratings,
    }
    seriesJson.push(novaSerie)

    response.status(201).send({
        "mensagem": "Serie cadastrada com Sucesso", novaSerie
    })
})



app.listen(8080, () => {
    console.log("Hello, hello")
})