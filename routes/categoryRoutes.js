import express from "express";
import { DEFAULT_CATEGORIES } from "../constants.js";
import Recipe from "../models/Recipe.js";

const router = express.Router();

/**
 * GET /api/categories
 * Responde lista de categorías base + categorías encontradas en BD
 */
router.get("/", async (_req, res) => {
  try {
    const distinct = await Recipe.distinct("category");
    const merged = Array.from(new Set([...DEFAULT_CATEGORIES, ...distinct])).sort();
    res.json(merged);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
});

export default router;
