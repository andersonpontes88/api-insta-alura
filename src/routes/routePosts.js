// cSpell:disable
import express from "express"; // Importa o framework Express para criar a API
import multer from "multer"; // Importa o middleware Multer para lidar com uploads de arquivos
import cors from "cors";

const optionsCors = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Importa as funções controladoras do arquivo postsController.js
import {
  listarPosts, // Função para listar todos os posts
  postarNovoPost, // Função para criar e salvar um novo post
  uploadImagem, // Função para processar o upload da imagem associada ao post
  atualizarNovoPost,
} from "../controller/postsController.js";

// Configura o armazenamento para uploads de imagens usando diskStorage do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para uploads. Crie o diretório "uploads" se necessário.
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo para uploads.
    cb(null, file.originalname);
  },
});

// Cria uma instância do middleware Multer usando o storage configurado
const upload = multer({ dest: "./uploads", storage }); // Pode ser alterado para storage apenas

// Define as rotas da API
const routes = (app) => {
  // Habilita o parseamento de dados JSON na requisição (para manipular dados do post)
  app.use(express.json());
  app.use(cors(optionsCors));

  // Rota GET para listar todos os posts (implemente listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (implemente postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e processamento com uploadImagem
  app.post("/upload", upload.single("imagem"), uploadImagem); // Aceita um único arquivo com o nome "imagem"

  app.put("/upload/:id", atualizarNovoPost);
};

export default routes; // Exporta a função routes para uso em outros arquivos
