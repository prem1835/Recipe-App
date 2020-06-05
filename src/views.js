import { getFilters } from "./filters";
import { getRecipes, removeIngredients, toggleIngredients } from "./recipe";

// Generate the DOM structure for a recipe

const generateRecipeDOM = (recipe) => {
  const recipeBox = document.createElement("a");
  const recipeTitle = document.createElement("h3");
  const recipePara = document.createElement("p");
  const foodImage = document.createElement("img");
  const wrapper = document.createElement("div");

  // Setup the recipe title text and status message
  if (recipe.title.length > 0) {
    recipeTitle.textContent = recipe.title;
    recipePara.textContent = generateIngreCount(recipe.ingredients);
  } else {
    recipeTitle.textContent = "Untitle recipe";
    recipePara.textContent = "Please give a title to your recipe";
  }

  // Setup the link
  recipeBox.setAttribute("href", `./edit.html#${recipe.id}`);
  foodImage.setAttribute("src", "./image/food.jpg");

  // Adding class name
  foodImage.classList.add("foodImage");
  recipeBox.classList.add("recipe__box");
  wrapper.classList.add("wrapper");
  recipePara.classList.add("recipe__para");
  recipeTitle.classList.add("recipe__heading");

  // append the element
  wrapper.appendChild(recipeTitle);
  wrapper.appendChild(recipePara);
  recipeBox.appendChild(wrapper);
  recipeBox.appendChild(foodImage);

  return recipeBox;
};

// Generate the DOM structure for a recipe ingredients

const generateIngreDOM = (recipeId, ingredient) => {
  const ingredients__block = document.createElement("div");
  const toggle__ingredient = document.createElement("input");
  const ingredient__text = document.createElement("label");
  const remove__ingredient = document.createElement("button");

  // setAttribute
  toggle__ingredient.setAttribute("type", "checkbox");
  toggle__ingredient.setAttribute("id", `${ingredient.id}`);
  ingredient__text.setAttribute("for", `${ingredient.id}`);
  toggle__ingredient.checked = ingredient.isAvailable;

  toggle__ingredient.addEventListener("change", () => {
    toggleIngredients(recipeId, ingredient.id);
    renderIngredients(recipeId);
  });

  //  add value
  ingredient__text.textContent = ingredient.text;
  remove__ingredient.textContent = "Remove";

  // add className
  remove__ingredient.classList.add("remove__ingredient");
  ingredients__block.classList.add("ingredients__block");

  // append element
  ingredients__block.appendChild(toggle__ingredient);
  ingredients__block.appendChild(ingredient__text);
  ingredients__block.appendChild(remove__ingredient);

  remove__ingredient.addEventListener("click", () => {
    removeIngredients(recipeId, ingredient.id);
    renderIngredients(recipeId);
  });

  return ingredients__block;
};
// Render application Recipes
const renderRecipes = () => {
  const recipesEl = document.querySelector(".recipe__container");
  const filters = getFilters();
  const filteredRecipe = getRecipes().filter((recipe) =>
    recipe.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );
  recipesEl.innerHTML = "";

  if (filteredRecipe.length > 0) {
    filteredRecipe.forEach((recipe) => {
      const recipeBox = generateRecipeDOM(recipe);
      recipesEl.appendChild(recipeBox);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = `No recipe to show, Add One 👇`;
    emptyMessage.classList.add("empty-message");
    recipesEl.appendChild(emptyMessage);
  }
};

// render Recipes ingredients

const renderIngredients = (id) => {
  const ingredientsEl = document.querySelector(".ingredients__container");
  ingredientsEl.classList.add("ingredients__container");

  const recipes = getRecipes().filter((recipe) => recipe.id === id);
  ingredientsEl.innerHTML = "";

  if (recipes[0].ingredients.length > 0) {
    recipes[0].ingredients.forEach((ingre) => {
      const ingredientBlock = generateIngreDOM(id, ingre);
      ingredientsEl.appendChild(ingredientBlock);
    });
    console.log("oooooooooooooooo");
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "Ingredients list is empty 🛒";
    emptyMessage.classList.add("empty-message");
    ingredientsEl.appendChild(emptyMessage);
    console.log("naaaaaaaaa");
  }
};

// initializeEditPage

const initializeEditPage = (recipeId) => {
  const titleElement = document.querySelector(".edit__title");
  const bodyElement = document.querySelector(".edit__body");
  const recipes = getRecipes();
  const recipe = recipes.find((note) => note.id === recipeId);

  if (!recipe) {
    location.assign("./index.html");
  }
  titleElement.value = recipe.title;
  bodyElement.value = recipe.body;
  renderIngredients(recipeId);
};

// Generate the ingredients count message
const generateIngreCount = (ingredients) => {
  if (ingredients.length > 0) {
    const everyIngre = ingredients.every((ingre) => ingre.isAvailable);
    const someIngre = ingredients.some((ingre) => ingre.isAvailable);
    if (everyIngre) {
      return "You have all the the ingredients";
    } else if (someIngre) {
      return "You have some of the the ingredients";
    }

    if (!someIngre) {
      return "You have none of the the ingredients";
    }
  } else {
    return "You have none of the the ingredients";
  }
};

export { renderRecipes, renderIngredients, initializeEditPage };
