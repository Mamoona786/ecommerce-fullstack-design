export const parsePrice = (price) => {
  if (!price) return 0;
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
};

export const matchesRating = (productRating, selectedRatings) => {
  if (!selectedRatings.length) return true;

  const numericRating = Number(productRating) || 0;

  return selectedRatings.some((rating) => numericRating >= rating);
};

export const normalizeText = (value) => String(value || "").toLowerCase().trim();

export const includesIgnoreCase = (source, target) =>
  normalizeText(source).includes(normalizeText(target));
