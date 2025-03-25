import { useAppContext } from "@/context/AppContext";
import { useState } from "react";

export default function PaymentMethod() {
  const { setPaymentMethod, setSelectedOffer, setShowPaymentModal } =
    useAppContext();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("airtime");

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setPaymentMethod("");
    setShowPaymentModal(false);
  };
  return (
    <div className='payment-modal payment-method'>
      <h3>Choose Payment Method</h3>
      <div
        className={`payment-option ${
          selectedPaymentMethod === "airtime" ? "selected" : ""
        }`}
        onClick={() => setSelectedPaymentMethod("airtime")}
      >
        <span>Airtime</span>
      </div>
      <div
        className={`payment-option ${
          selectedPaymentMethod === "mpesa" ? "selected" : ""
        }`}
        onClick={() => setSelectedPaymentMethod("mpesa")}
      >
        <span>Mpesa</span>
      </div>

      <div className='modal-btn-container'>
        <button className='modal-btn modal-cancel' onClick={handleCloseModal}>
          Cancel
        </button>
        <button
          className='modal-btn modal-proceed'
          onClick={() => setPaymentMethod(selectedPaymentMethod)}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}
