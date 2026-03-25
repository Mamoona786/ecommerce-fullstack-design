export const parsePrice = (price) => {
  if (!price) return 0;
  return Number(String(price).replace(/[^0-9.]/g, "")) || 0;
};

export const matchesRating = (productRating, selectedRatings) => {
  if (!selectedRatings.length) return true;

  const numericRating = Number(productRating) || 0;

  return selectedRatings.some((rating) => {
    if (rating === 5) return numericRating >= 9;
    if (rating === 4) return numericRating >= 7;
    if (rating === 3) return numericRating >= 5;
    if (rating === 2) return numericRating >= 3;
    return true;
  });
};

export const normalizeText = (value) => String(value || "").toLowerCase().trim();

export const includesIgnoreCase = (source, target) =>
  normalizeText(source).includes(normalizeText(target));
