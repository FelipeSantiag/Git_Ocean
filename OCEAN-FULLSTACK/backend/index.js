const express = require('express')
const { MongoClient } = require("mongodb");

const url = "mongodb+srv://admin:LdQHrR3iAM9u4Mtw@cluster0.ih1f4.mongodb.net";

const dbName = "jornada-fullstack-agosto-22-Santiago";


async function main(){
//Realizar conecxão com o mongoClient;
//MongoClient -> MongoDatabase -> MongoCollection
//Conecxões com o Client podem levar um tempo para
//concluir. Portanto utilizamos o mecanismo de Promises do JS,
//que permitem aguardar esse tempo.
//Para isso utilizei Async/Await

console.log("Conectando com o DBase...")
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);
  const collection = db.collection("pontuacoes");

  const app = express();
console.log("Conectado com sucesso com o DBase.")

//Sinalizando para o express  o uso do 
//JSON no body das requisições
app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/eu', function (req, res) {
  res.send('Oilá, meu nome eh Santi e estou nesta pagina')
})

app.get('/oi', function (req, res) {
  res.send('Olá mundo')
})

//first:Criar a lista com as pontuações
//O backend armazena as pontuações

//const lista = [
//  {
//    id: 1,
//    nome: "Paulo",
//    pontos: 21,
//  },
//  {
//    id: 2,
//    nome: "Daniel",
//    pontos: 52,
//  },
//  {
//    id: 3,
//   nome: "Beatriz",
//   pontos: 97,
//  },
//];

// Endpoint READ ALL - [GET] /pontuacoes
app.get("/pontuacoes", async function (req, res) {
  const itens = await collection
  .find()
  .sort({ pontos: -1 })
  .limit(10)
  .toArray();
  res.send(itens);
});

// Endpoint CREATE - [POST] /pontuacoes
app.post("/pontuacoes", async function (req, res) {
  // Peguei o item do corpo da requisição
  const item = req.body;
  // console.log(item);
  //res.send("Criar uma pontuação");

  // Adicionar o item na lista (teste)
  //lista.push({
  //  id: lista.length + 1,
  //  nome: item.nome,
  //  pontos: item.pontos,
  //});

  await collection.insertOne(item);

  res.send(item);
});

app.listen(process.env.PORT || 3000);
}

//Executando a função Main()
main();