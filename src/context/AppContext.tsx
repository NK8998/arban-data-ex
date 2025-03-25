"use client";

import { Offer } from "@/types/offers";
import { createContext, useContext, useState } from "react";

export interface FormattedPhoneObjType {
  formattedPhone: string;
  formattedPhoneWithCode: string;
}

export interface AppContextProps {
  phone: string;
  setPhone: (phone: string) => void;
  offers: Offer[];
  setOffers: (offers: Offer[]) => void;
  selectedOffer: Offer | null;
  setSelectedOffer: (offer: Offer | null) => void;
  formattedPhoneObj: FormattedPhoneObjType | null;
  setFormattedPhoneObj: (formattedPhoneObj: FormattedPhoneObjType) => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
  showPaymentModal: boolean;
  setShowPaymentModal: (show: boolean) => void;
  requestId: string;
  setRequestId: (requestId: string) => void;
}

export interface AppProviderProps {
  children: React.ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: AppProviderProps) => {
  const [phone, setPhone] = useState<string>("");
  const [formattedPhoneObj, setFormattedPhoneObj] =
    useState<FormattedPhoneObjType | null>(null);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [requestId, setRequestId] = useState("");

  const value: AppContextProps = {
    phone,
    setPhone,
    offers,
    setOffers,
    selectedOffer,
    setSelectedOffer,
    formattedPhoneObj,
    setFormattedPhoneObj,
    paymentMethod,
    setPaymentMethod,
    showPaymentModal,
    setShowPaymentModal,
    requestId,
    setRequestId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within a AppProvider");
  }

  return context;
};
