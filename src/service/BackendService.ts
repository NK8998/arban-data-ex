import {
  ErrorResponse,
  KataPurchaseResponse,
  KataStatusResponse,
  OffersResponse,
  PurchaseBody,
} from "@/types/offers";
import axios, { AxiosResponse } from "axios";

export const BackendService = {
  getPurchaseOptions: async (msisdn: string) => {
    const url = `https://api.kata.africa/kata/v1/get-offers/${msisdn}`;
    try {
      const response: AxiosResponse<OffersResponse> = await axios.get(url);
      return response.data;
    } catch (err) {
      throw new Error("Error fetching purchase options");
    }
  },

  purchaseOffer: async (body: PurchaseBody) => {
    //const url = "/api/purchase";
    const url = `https://api.kata.africa/kata/v1/purchase-offers`;
    try {
      const response: AxiosResponse<KataPurchaseResponse> = await axios.post(
        url,
        body
      );
      return response.data;
    } catch (err) {
      throw new Error("Error when purchasing airtime");
    }
  },

  checkPurchaseStatus: async (requestId: string, accountId: string) => {
    //const url = `/api/status/${requestId}/${accountId}`;
    const url = `https://api.kata.africa/kata/v1/request/${requestId}/${accountId}`;

    try {
      const response: AxiosResponse<KataStatusResponse> = await axios.get(url);
      return response.data;
    } catch (err) {
      throw new Error("Error fetching purchase status");
    }
  },
};
