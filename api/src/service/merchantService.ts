import { merchants } from "../data/merchants";
import { Merchant } from "../models/merchants";

export const getMerchantById = async (
  id: string,
): Promise<Merchant | undefined> => {
  try {
    //Get merchant from DB
    return merchants.find((merchant) => merchant.id === id);
  } catch (error) {
    throw error;
  }
};
