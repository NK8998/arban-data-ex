import { useAppContext } from "@/context/AppContext";
import { BackendService } from "@/service/BackendService";
import { Offer } from "@/types/offers";
import { validateAndFormatKenyanPhoneNumber } from "@/util";
import { useState } from "react";
import { toast } from "sonner";
import OptionsContainer from "./OptionsContainer";
import { Loader2 } from "lucide-react";

export default function OptionsSwapper({}) {
  const { phone, offers, setOffers, setFormattedPhoneObj } = useAppContext();
  const [loading, setLoading] = useState(false);

  const getOffers = async () => {
    if (!phone) return toast.error("Please enter a phone number");
    const { isValid, formattedPhone, formattedPhoneWithCode } =
      validateAndFormatKenyanPhoneNumber(phone);

    if (!isValid || !formattedPhone || !formattedPhoneWithCode) {
      toast.error("Invalid phone number");
      return;
    }
    setLoading(true);

    setFormattedPhoneObj({ formattedPhone, formattedPhoneWithCode });

    try {
      const response = await BackendService.getPurchaseOptions(
        formattedPhoneWithCode
      );
      setOffers(response.data);
    } catch (error) {
      toast.error("Error fetching offers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='options-container-swapper'>
      {!offers.length ? (
        <button className='check-btn typical-ad-button-con' onClick={getOffers}>
          {loading ? <Loader2 className='spinner' /> : "Check"}
        </button>
      ) : (
        <OptionsContainer />
      )}
    </div>
  );
}
