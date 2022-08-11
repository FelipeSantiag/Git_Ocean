const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/eu', function (req, res) {
  res.send('Oilá, meu nome eh Santi e estou nesta pagina')
})

app.get('/oi', function (req, res) {
  res.send('Olá mundo')
})

//Isso é um comentario
//signiica que esse cara não será lido.
//first:Criar a lista com as pontuações
//Obackend armazena as pontuações

const lista = [
  {
    id: 1,
    nome: "Paulo",
    pontos: 21,
  },
  {
    id: 2,
    nome: "Daniel",
    pontos: 52,
  },
  {
    id: 3,
    nome: "Beatriz",
    pontos: 97,
  },
];
//Endpoint READ ALL - [GET] /pontuações
app.get("/pontuacoes", function(req, res){
  res.send(lista);
}
);

//Endpoint CREATE - [POST] / pontuações
app.post("/pontuacoes", function(req,res){
  res.send("Criar uma pontuação");
}
);

app.listen(3000)
