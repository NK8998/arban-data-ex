import { useAppContext } from "@/context/AppContext";
import { Offer } from "@/types/offers";

export default function OptionsContainer() {
  const { offers, setSelectedOffer, setShowPaymentModal } = useAppContext();

  const handleSelection = (offer: Offer) => {
    setSelectedOffer(offer);
    setShowPaymentModal(true);
  };

  const optionEls = offers.map((offer, index) => {
    return (
      <div
        className='offer-option'
        key={index}
        onClick={() => handleSelection(offer)}
      >
        <div className='offer-left offer-column'>
          <span className='offer-title'>Pay</span>
          <span>
            <b>Ksh {offer.offerPrice}</b>
          </span>
        </div>
        <div className='offer-right offer-column'>
          <span className='offer-title'>Get</span>
          <span>
            <b>{offer.offerName}</b>
          </span>
        </div>
      </div>
    );
  });

  return <div className='options-container'>{optionEls}</div>;
}
