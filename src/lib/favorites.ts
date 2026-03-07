export type FavoriteRecipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions?: string;
};

const FAVORITES_STORAGE_KEY = "craveout-favorites";
const FAVORITES_UPDATED_EVENT = "craveout-favorites-updated";

const canUseStorage = () =>
  typeof window !== "undefined" && typeof localStorage !== "undefined";

export const getFavorites = (): FavoriteRecipe[] => {
  if (!canUseStorage()) return [];

  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as FavoriteRecipe[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

const saveFavorites = (favorites: FavoriteRecipe[]) => {
  if (!canUseStorage()) return;
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  window.dispatchEvent(new Event(FAVORITES_UPDATED_EVENT));
};

export const toggleFavorite = (recipe: FavoriteRecipe) => {
  const favorites = getFavorites();
  const exists = favorites.some((item) => item.idMeal === recipe.idMeal);

  if (exists) {
    saveFavorites(favorites.filter((item) => item.idMeal !== recipe.idMeal));
    return false;
  }

  saveFavorites([recipe, ...favorites]);
  return true;
};

export const isFavorite = (idMeal: string) =>
  getFavorites().some((item) => item.idMeal === idMeal);

export const favoritesUpdatedEvent = FAVORITES_UPDATED_EVENT;
