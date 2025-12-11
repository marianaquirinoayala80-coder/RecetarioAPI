import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { IP_SERVER, PORT, DB_URI } from "./constants.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(DB_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.error("Error MongoDB:", err));

app.use("/api/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${IP_SERVER}:${PORT}/api`);
});
