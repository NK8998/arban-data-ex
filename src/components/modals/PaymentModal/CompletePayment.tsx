import { useAppContext } from "@/context/AppContext";
import { BackendService } from "@/service/BackendService";
import { PurchaseBody } from "@/types/offers";
import { useProgress } from "@bprogress/next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function CompletePayment() {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const {
    setPaymentMethod,
    setSelectedOffer,
    selectedOffer,
    formattedPhoneObj,
    paymentMethod,
    setShowPaymentModal,
    setRequestId,
  } = useAppContext();
  const { start } = useProgress();

  const handleCloseModal = () => {
    setSelectedOffer(null);
    setPaymentMethod("");
    setShowPaymentModal(false);
  };

  const handleContinue = async () => {
    if (!selectedOffer || !formattedPhoneObj || !paymentMethod) {
      console.log("some fields are missing");
      return;
    }
    if (loading) return;
    try {
      const body: PurchaseBody = {
        accountId: `${selectedOffer.resourceAccId}`,
        msisdn: formattedPhoneObj?.formattedPhone.replace("0", ""),
        offeringId: `${selectedOffer?.offeringId}`,
        paymentMode: paymentMethod,
        price: `${selectedOffer?.offerPrice}`,
        resourceAmount: `${selectedOffer?.resourceValue}`,
        validity: `${selectedOffer.offerValidity}`,
      };
      setloading(true);
      const res = await BackendService.purchaseOffer(body);
      setRequestId(res.data.requestRefId);

      if (res.data.responseMessage.includes("insufficient")) {
        toast.error("Insufficient funds");
      } else if (res.message.includes("success")) {
        if (paymentMethod === "mpesa") {
          toast.info("Please complete the payment on your phone");
        } else {
          toast.success("Payment successful");
        }
      } else if (
        res.data.responseMessage.includes("Technical Error") ||
        res.data.responseMessage.includes("try again later")
      ) {
        toast.error("Payment failed, please try again later");
      }

      if (paymentMethod === "mpesa") {
        setShowPaymentModal(false);
        start();
        router.push("/status");
      } else {
        handleCloseModal();
      }
    } catch (err) {
      toast.error("An error occurred");
      return;
    } finally {
      setloading(false);
    }
  };

  return (
    <div className='payment-modal complete-payment'>
      <h3>Information</h3>

      <div className='payment-details'>
        <div className='detail-row'>
          <span className='row-info'>Mobile Number</span>
          <span>+{formattedPhoneObj?.formattedPhoneWithCode}</span>
        </div>
        <div className='detail-row'>
          <span className='row-info'>Network</span>
          <span>Safaricom</span>
        </div>
        <div className='detail-row'>
          <span className='row-info'>Data</span>
          <span>{selectedOffer?.offerName}</span>
        </div>
        <div className='detail-row'>
          <span className='row-info'>You pay</span>
          <span>Ksh {selectedOffer?.offerPrice}</span>
        </div>
        <div className='detail-row'>
          <span className='row-info'>Method</span>
          <span>{paymentMethod}</span>
        </div>
      </div>

      <div className='modal-btn-container'>
        <button className='modal-btn modal-cancel' onClick={handleCloseModal}>
          Cancel
        </button>
        <button className='modal-btn modal-proceed' onClick={handleContinue}>
          {loading ? <Loader2 className='spinner' /> : "Continue"}
        </button>
      </div>
    </div>
  );
}
