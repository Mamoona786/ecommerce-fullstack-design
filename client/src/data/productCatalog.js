export const productCatalog = [];

export const getCatalogProducts = () => productCatalog;

export const getCatalogProductById = (id) =>
  productCatalog.find((item) => String(item.id) === String(id));

export const getProductsByIds = (ids = []) =>
  ids
    .map((id) => getCatalogProductById(id))
    .filter(Boolean);
