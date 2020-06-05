import { renderRecipes } from "./views";
import { setFilters } from "./filters";
import { createRecipe, loadRecipe } from "./recipe";
// Render initial todos
renderRecipes();
// Set up search text handler
document.querySelector(".search__box").addEventListener("input", (e) => {
  setFilters({
    searchText: e.target.value,
  });
  renderRecipes();
});

// Add new Recipe

document.querySelector(".button").addEventListener("click", (e) => {
  const id = createRecipe();
  location.assign(`./edit.html#${id}`);
});

// load todos from localStorage
window.addEventListener("storage", (e) => {
  if (e.key === "todos") {
    loadRecipe();
    renderRecipes();
  }
});
