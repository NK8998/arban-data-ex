import Link from "next/link";
import "./page.css";
import Image from "next/image";

export default function Home() {
  return (
    <div className={"landing-page"}>
      <Image
        src={"/images/AD-logo.png"}
        height={112}
        width={194}
        className='logo'
        alt='Arban data logo'
      />
      <Image
        src={"/images/landing-img.png"}
        width={361}
        height={270}
        className='landing-img'
        alt='landing page illustration'
      />
      <h1>
        Offers just for <span>you!</span>
      </h1>

      <Link href={"/purchase"} className='landing-btn typical-ad-button-con'>
        Anguka nayo
      </Link>

      <p>
        By clicking Anguka Nayo you agree to our <br />
        <a href='https://arbangames.co.ke/legal/privacy_policy' target='_blank'>
          Data Privacy policy
        </a>
      </p>
    </div>
  );
}
