import cors from "cors";
import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200 
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage});

const routes = (app) => {
  // Habilita o parsing de dados JSON nas requisições.
  app.use(express.json());
  app.use(cors(corsOptions));
  // Define uma rota GET para buscar todos os posts.
  app.get("/posts", listarPosts);

  // Rota para criar um post
  app.post("/posts", postarNovoPost);
  // Upload da imagem
  app.post("/upload", upload.single("imagem"), uploadImagem);
  app.put("/upload/:id", atualizarNovoPost);
};

export default routes;
