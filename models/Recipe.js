// models/Recipe.js
import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    ingredients: { type: String, required: true },
    steps: { type: String, required: true },
    image: { type: String, default: "" },
    country: { type: String, default: "" },
    category: { type: String, default: "" },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
