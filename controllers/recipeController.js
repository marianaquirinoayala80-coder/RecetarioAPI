// controllers/recipeController.js
import Recipe from "../models/Recipe.js";

// GET /api/recipes
export async function getRecipes(req, res) {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    return res.json(recipes);
  } catch (e) {
    console.error("getRecipes error:", e);
    return res.status(500).json({ message: "Error al obtener recetas" });
  }
}

// GET /api/recipes/:id
export async function getRecipeById(req, res) {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Receta no encontrada" });
    return res.json(recipe);
  } catch (e) {
    console.error("getRecipeById error:", e);
    return res.status(500).json({ message: "Error al obtener receta" });
  }
}

// GET /api/recipes/search?q=texto
export async function searchRecipes(req, res) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) return res.json([]);

    const regex = new RegExp(q, "i");
    const results = await Recipe.find({
      $or: [
        { title: regex },
        { ingredients: regex },
        { steps: regex },
        { country: regex },
        { category: regex },
        { tags: regex },
      ],
    }).sort({ createdAt: -1 });

    return res.json(results);
  } catch (e) {
    console.error("searchRecipes error:", e);
    return res.status(500).json({ message: "Error en la búsqueda" });
  }
}

// POST /api/recipes
export async function createRecipe(req, res) {
  try {
    const {
      title,
      ingredients,
      steps,
      image = "",
      country = "",
      category = "",
      tags = [],
    } = req.body;

    if (!title || !ingredients || !steps) {
      return res
        .status(400)
        .json({ message: "title, ingredients y steps son obligatorios" });
    }

    const recipe = new Recipe({
      title,
      ingredients,
      steps,
      image,
      country,
      category,
      tags,
    });

    await recipe.save();
    return res.json({ message: "Receta creada", recipe });
  } catch (e) {
    console.error("createRecipe error:", e);
    return res.status(500).json({ message: "Error al crear receta" });
  }
}

// DELETE /api/recipes/:id
export async function deleteRecipe(req, res) {
  try {
    const deleted = await Recipe.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Receta no encontrada" });
    return res.json({ message: "Receta eliminada" });
  } catch (e) {
    console.error("deleteRecipe error:", e);
    return res.status(500).json({ message: "Error al eliminar receta" });
  }
}
