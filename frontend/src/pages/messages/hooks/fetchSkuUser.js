import { getSkuUser } from "@/apis/dealer";

const fetchSkuUser = async (dealerId) => {
  try {
    return await getSkuUser(dealerId);
  } catch (error) {
    console.error("Error fetching data:", error);
    return error;
  }
};

export { fetchSkuUser };
