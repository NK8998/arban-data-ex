import { Loader2 } from "lucide-react";
import "./style.css";

export default function PendingStatus({
  checkStatus,
}: {
  checkStatus: () => void;
}) {
  return (
    <div className='status-container pending-status'>
      <div className='status-upper'>
        <Loader2 className='spinner' color='#FFBF0D' />
        <h2>Paying, please wait</h2>
        <p className='like-entice more-space'>
          Please do not leave this page to avoid some situations.{" "}
        </p>
        <br />
        <p className='like-entice'>
          You can click check button below to get the recharge result about 5 -
          10 seconds.{" "}
        </p>
      </div>

      <button
        className='typical-ad-button-con status-btn'
        onClick={checkStatus}
      >
        Check
      </button>
    </div>
  );
}
