const filters = {
  searchText: "",
};

const getFilters = () => filters;

const setFilters = (updates) => {
  if (typeof updates.searchText === "string") {
    filters.searchText = updates.searchText;
  }
};

export { getFilters, setFilters };
