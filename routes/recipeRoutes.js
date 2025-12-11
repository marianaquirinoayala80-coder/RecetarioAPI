// routes/recipeRoutes.js
import express from "express";
import {
  getRecipes,
  getRecipeById,
  searchRecipes,
  createRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

// Crear receta (POST /api/recipes)
router.post("/", createRecipe);

// Listar todas (GET /api/recipes)
router.get("/", getRecipes);

// Buscar (GET /api/recipes/search?q=texto)
router.get("/search", searchRecipes);

// Obtener una (GET /api/recipes/:id)
router.get("/:id", getRecipeById);

// Eliminar una (DELETE /api/recipes/:id)
router.delete("/:id", deleteRecipe);

export default router;
