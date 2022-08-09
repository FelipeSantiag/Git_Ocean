const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/eu', function (req, res) {
  res.send('Oi, meu nome eh Santi e estou nesta pagina')
})

app.get('/oi', function (req, res) {
  res.send('Olá mundo')
})

app.listen(3000)
