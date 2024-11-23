// cSpell:disable
import express from "express"; // Importa o framework Express para criar a aplicação web
import routes from "./src/routes/routePosts.js";

const app = express(); // Cria uma instância do aplicativo Express.
app.use(express.static("uploads"));
routes(app);
const PORT = 3001; // Define a porta que o servidor irá utilizar para escutar as requisições.

app.listen(3001, () => {
  console.log("Servidor ouvindo na porta ->", PORT);
});
// Inicia o servidor na porta especificada e exibe uma mensagem no console
// indicando que o servidor está em execução.
