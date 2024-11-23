// cSpell:disable
import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbconfig.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);
// Estabelece a conexão com o banco de dados usando a string de conexão
// obtida da variável de ambiente `STRING_CONEXAO`.

export async function getTodosPosts() {
  const db = conexao.db("backend-alura");
  // Obtém o banco de dados "backend-alura" a partir da conexão estabelecida.
  const colecao = db.collection("posts");
  // Obtém a coleção "posts" dentro do banco de dados.
  return colecao.find().toArray();
  // Busca todos os documentos na coleção "posts" e retorna os resultados como um array.
}

export async function criarPost(novoPost) {
  const db = conexao.db("backend-alura");
  const colecao = db.collection("posts");

  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("backend-alura");
  const objId = ObjectId.createFromHexString(id);
  const colecao = db.collection("posts");

  return colecao.updateOne({ _id: new ObjectId(objId) }, { $set: novoPost });
}
