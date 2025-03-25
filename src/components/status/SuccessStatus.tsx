import { CopyIconSvg, TickIconSvg } from "@/assets/icons";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import "./style.css";

export default function SuccessStatus() {
  const { formattedPhoneObj, selectedOffer, requestId } = useAppContext();
  return (
    <div className='status-container'>
      <div className='status-upper'>
        <TickIconSvg />
        <h2>Payment Success!</h2>
        <div className='payment-details-complete'>
          <div className='detail-row-complete'>
            <span className='row-info-complete'>Mobile number</span>
            <span>+ {formattedPhoneObj?.formattedPhoneWithCode}</span>
          </div>
          <div className='detail-row-complete'>
            <span className='row-info-complete'>Carrier</span>
            <span>Safaricom</span>
          </div>
          <div className='detail-row-complete'>
            <span className='row-info-complete'>Data</span>
            <span>{selectedOffer?.offerName}</span>
          </div>
          <div className='detail-row-complete'>
            <span className='row-info-complete'>You pay</span>
            <span>Ksh {selectedOffer?.offerPrice}</span>
          </div>
          <div className='detail-row-complete last-row'>
            <span className='row-info-complete'>Order ID</span>
            <span>{requestId}</span>
          </div>
        </div>
      </div>
      <br />

      <p className='like-entice'>
        If you like us, you can enjoy dicounts at any time and sahre with your
        friends.
      </p>
      <p className='like-entice'>
        Remember this link,{" "}
        <a href={`${window.location.origin}`}>www.arbandata.co.ke</a>
        <span className='copy-container'>
          <CopyIconSvg />
        </span>
      </p>

      <Link href='/purchase' className='typical-ad-button-con status-btn'>
        Okay
      </Link>
    </div>
  );
}
