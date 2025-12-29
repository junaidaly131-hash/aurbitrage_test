import { api } from "./api";
const updateDealerDetails = async (dealerId, formData) => {
  let apiEndpoint = `/api/v1/dealer/update-details/${dealerId}`;
  return await api.patch(apiEndpoint, formData);
};
const getAuthorizations = async (id) => {
  let apiEndpoint = `/api/v1/dealer/authorizations`;
  if (id) {
    apiEndpoint += `?dealerId=${id}`;
  }
  return await api.get(apiEndpoint);
};
const getAffiliations = async (id) => {
  let apiEndpoint = `/api/v1/dealer/affiliations`;
  if (id) {
    apiEndpoint += `?dealerId=${id}`;
  }
  return await api.get(apiEndpoint);
};
const getPeople = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/employees/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getDealer = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/detailed/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getCouriers = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/couriers/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getDealerOnly = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/details-only/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getAddresses = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/addresses/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getShipping = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/couriers/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getAffiliationAuthorization = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/affiliations-authorizations/${dealerId}`;
  return await api.get(apiEndpoint);
};
const getShippingGuide = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/shipping-description/${dealerId}`;
  return await api.get(apiEndpoint);
};
const postNewAffiliation = async (payload) => {
  const apiEndpoint = `/api/v1/dealer/affiliation`;
  return await api.post(apiEndpoint, payload);
};

const updateAddress = async (payload) => {
  let apiEndpoint = `/api/v1/dealer/address`;
  if (payload.id) {
    apiEndpoint += `/${payload.id}`;
    return await api.patch(apiEndpoint, payload);
  } else {
    return await api.post(apiEndpoint, payload);
  }
};
const addAffliations = async (payload) => {
  let apiEndpoint = `/api/v1/dealer/add-affiliations`;
  return await api.post(apiEndpoint, payload);
};
const addAuthorizations = async (payload) => {
  let apiEndpoint = `/api/v1/dealer/add-authorizations`;
  return await api.post(apiEndpoint, payload);
};
const addShippingGuide = async (payload) => {
  let apiEndpoint = `/api/v1/dealer/shipping-description/${payload.dealerId}`;
  return await api.patch(apiEndpoint, payload);
};
const addCourier = async (payload) => {
  let apiEndpoint = `/api/v1/dealer/courier`;
  return await api.post(apiEndpoint, payload);
};
const deleteCourier = async (id, dealerId) => {
  let apiEndpoint = `/api/v1/dealer/courier/${dealerId}/${id}`;
  return await api.del(apiEndpoint);
};
const updateCourier = async (payload, checked) => {
  let apiEndpoint = `/api/v1/dealer/courier`;
  if (checked) {
    apiEndpoint += `/${payload.courierId}`;
    return await api.patch(apiEndpoint, payload);
  } else {
    return await api.post(apiEndpoint, payload);
  }
};
const addAffliation = async (formData) => {
  let apiEndpoint = `/api/v1/dealer/affiliation`;
  return await api.post(apiEndpoint, formData);
};
const addPeople = async (body) => {
  const apiEndpoint = `/api/v1/dealer/add-employee/`;
  return await api.post(apiEndpoint, body);
};
const getSkuUser = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/${dealerId}/user`;
  return await api.get(apiEndpoint);
};

const getDealerUserByDealerId = async (dealerId) => {
  const apiEndpoint = `/api/v1/dealer/${dealerId}/user`;
  return await api.get(apiEndpoint);
};

export {
  updateDealerDetails,
  getAuthorizations,
  getAffiliations,
  getPeople,
  getDealer,
  getCouriers,
  getDealerOnly,
  getAddresses,
  getShipping,
  getAffiliationAuthorization,
  getShippingGuide,
  postNewAffiliation,
  updateAddress,
  addAffliations,
  addAuthorizations,
  addShippingGuide,
  addCourier,
  deleteCourier,
  updateCourier,
  addAffliation,
  addPeople,
  getSkuUser,
  getDealerUserByDealerId,
};
