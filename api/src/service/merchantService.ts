import { merchants } from "../data/merchants";
import { Merchant } from "../models/merchants";

export const getMerchantById = async (id: string): Promise<Merchant> => {
  try {
    //Get merchant from DB
    const merchant = merchants.find((merchant) => merchant.id === id);
    if (!merchant) {
      throw new Error("Merchant not found");
    }
    return merchant;
  } catch (error) {
    throw error;
  }
};
