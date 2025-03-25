import { CopyIconSvg, ErrorIconSvg } from "@/assets/icons";
import Link from "next/link";
import "./style.css";

export default function ErrorStatus() {
  return (
    <div className='status-container incomplete-status'>
      <div className='status-upper'>
        <ErrorIconSvg />

        <h2>Payment Failed!</h2>

        <div className='dotted-spacer'></div>

        <p className='like-entice'>
          Please make sure you have enough balance in your account.
        </p>
      </div>

      <Link href='/purchase' className='typical-ad-button-con status-btn'>
        Okay
      </Link>
    </div>
  );
}
