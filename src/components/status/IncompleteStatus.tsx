import { CopyIconSvg, ErrorIconSvg } from "@/assets/icons";
import Link from "next/link";
import "./style.css";

export default function IncompleteStatus() {
  return (
    <div className='status-container incomplete-status'>
      <div className='status-upper'>
        <ErrorIconSvg />

        <h2>Payment Incompete!</h2>

        <div className='dotted-spacer'></div>

        <p className='like-entice'>
          Don’t worry your money is safe. If money has been paid from your
          account, you can contact us.
        </p>

        <p className='like-entice'>
          WhatsApp number : <span>+254712345678</span>{" "}
          <span className='copy-container'>
            <CopyIconSvg />
          </span>
        </p>
      </div>

      <Link href='/purchase' className='typical-ad-button-con status-btn'>
        Okay
      </Link>
    </div>
  );
}
