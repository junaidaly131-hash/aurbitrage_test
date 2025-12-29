import { api } from "./api";

const removeAllFavoritesShortlists = async (payload, signal = null) => {
  const url = `/api/v1/pricing/remove-all-favorites-shortlists`;
  return await api.del(url, payload, signal);
};
const deleteAurbitrageSKU = async (id, signal = null) => {
  const url = `/api/v1/sku-relations/delete-aurbitrage-sku/${id}`;
  return await api.del(url, null, signal);
};

export { removeAllFavoritesShortlists, deleteAurbitrageSKU };
