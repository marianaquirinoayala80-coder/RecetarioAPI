// app.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import recipeRoutes from "./routes/recipeRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas base
app.use("/api/recipes", recipeRoutes);

// Raíz
app.get("/", (_req, res) => {
  res.send("API del Recetario en funcionamiento ✅");
});

export default app;
