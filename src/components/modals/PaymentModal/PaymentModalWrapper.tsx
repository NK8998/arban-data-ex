"use client";
import { useAppContext } from "@/context/AppContext";
import PaymentMethod from "./PaymentMethod";
import CompletePayment from "./CompletePayment";
import "../style.css";

export default function PaymentModalWrapper() {
  const {
    selectedOffer,
    setSelectedOffer,
    paymentMethod,
    setPaymentMethod,
    showPaymentModal,
    setShowPaymentModal,
  } = useAppContext();

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setPaymentMethod("");
    setShowPaymentModal(false);
  };

  return (
    <div
      className={`payment-modal-wrapper ${
        showPaymentModal && selectedOffer ? "show" : ""
      }`}
    >
      <div className='payment-modal-bg' onClick={handleCloseModal} />
      <div className='payment-modal-inner'>
        {paymentMethod ? <CompletePayment /> : <PaymentMethod />}
      </div>
    </div>
  );
}
