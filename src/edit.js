import { initializeEditPage, renderIngredients } from "./views";
import { updateRecipe, deleteRecipe, addIngredient } from "./recipe";

const titleElement = document.querySelector(".edit__title");
const bodyElement = document.querySelector(".edit__body");
const addIngredientsEl = document.querySelector(".add__ingredient");
const addIngredientsBtn = document.querySelector(".btn__add-ingredient");
const deleteRecipeBtn = document.querySelector(".btn__delete-recipe");
const recipeId = location.hash.substring(1);

initializeEditPage(recipeId);
titleElement.addEventListener("input", (e) => {
  updateRecipe(recipeId, { title: e.target.value });
});

bodyElement.addEventListener("input", (e) => {
  updateRecipe(recipeId, { body: e.target.value });
});

addIngredientsBtn.addEventListener("click", () => {
  const ingredientValue = addIngredientsEl.value.trim();
  if (ingredientValue !== "") {
    addIngredient(recipeId, ingredientValue);
    renderIngredients(recipeId);
    addIngredientsEl.value = "";
  }
});
addIngredientsEl.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    addIngredientsBtn.click();
  }
});

deleteRecipeBtn.addEventListener("click", (e) => {
  deleteRecipe(recipeId);
  location.assign("./index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "recipes") {
    initialzeEditPage(recipeId);
  }
});
