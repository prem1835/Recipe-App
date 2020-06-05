import { v4 as uuidv4 } from "uuid";

let recipes = [];

// Fetch existing recipes from localStorage

const loadRecipe = () => {
  const recipesJSON = localStorage.getItem("recipes");

  try {
    recipes = recipesJSON ? JSON.parse(recipesJSON) : [];
  } catch (e) {
    recipes = [];
  }
};

// Save recipes to localStorage

const saveRecipes = () => {
  localStorage.setItem("recipes", JSON.stringify(recipes));
};

// getRecipes for other file

const getRecipes = () => recipes;

// Create recipes
const createRecipe = () => {
  const id = uuidv4();
  recipes.push({
    id: id,
    title: "",
    body: "",
    ingredients: [],
  });
  saveRecipes();
  return id;
};

//  Add ingredients
const addIngredient = (id, text) => {
  const ids = uuidv4();
  const recipeObj = recipes.find((recipe) => recipe.id === id);
  if (!recipeObj) {
    return;
  }
  recipeObj.ingredients.push({ id: ids, text, isAvailable: false });
  saveRecipes();
};

// Delete Recipe
const deleteRecipe = (id) => {
  const recipeIndex = recipes.findIndex((recipe) => recipe.id === id);

  if (recipeIndex > -1) {
    recipes.splice(recipeIndex, 1);
    saveRecipes();
  }
};

// remove Ingredients

const removeIngredients = (id, ids) => {
  const recipeObj = recipes.find((recipe) => recipe.id === id);
  const recipeIndex = recipeObj.ingredients.findIndex(
    (recipe) => recipe.id === ids
  );
  if (recipeIndex > -1) {
    recipeObj.ingredients.splice(recipeIndex, 1);
    saveRecipes();
  }
};

// Toggle the Available ingredients

const toggleIngredients = (id, ids) => {
  const recipeObj = recipes.find((recipe) => recipe.id === id);
  const recipe = recipeObj.ingredients.find((recipe) => recipe.id === ids);

  if (recipe) {
    recipe.isAvailable = !recipe.isAvailable;
    saveRecipes();
  }
};

// update recipe

const updateRecipe = (id, updates) => {
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return;
  }

  if (typeof updates.title === "string") {
    recipe.title = updates.title;
  }

  if (typeof updates.body === "string") {
    recipe.body = updates.body;
  }
  saveRecipes();
};

loadRecipe();

export {
  getRecipes,
  createRecipe,
  addIngredient,
  deleteRecipe,
  removeIngredients,
  toggleIngredients,
  updateRecipe,
  loadRecipe,
};
