/* Trabalho Interdisciplinar 1 - Aplicações Web

  Esse módulo implementa uma API RESTful baseada no JSONServer
  O servidor JSONServer fica hospedado na seguinte URL
  https://jsonserver.rommelpuc.repl.co/contatos

  Para montar um servidor para o seu projeto, acesse o projeto 
  do JSONServer no Replit, faça o FORK do projeto e altere o 
  arquivo db.json para incluir os dados do seu projeto.

  URL Projeto JSONServer: https://replit.com/@rommelpuc/JSONServer

  Autor: Rommel Vieira Carneiro
  Data: 03/10/2023

*/

const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');
const path = require('path');

/** Adaptado por Bernardo Alvim */

const app = express();
const router = jsonServer.router('./public/assets/data/db.json');
const middlewares = jsonServer.defaults();

app.use(cors());
app.use(middlewares);

app.use(express.static(path.join(__dirname, '/public')));

// Usar o router do JSON Server
app.use('/api', router);

const PORT = 3080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
