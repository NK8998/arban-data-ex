"use client";
import Image from "next/image";
import "./style.css";
import { SafaricomBanner } from "@/assets/icons";
import { useAppContext } from "@/context/AppContext";
import OptionsSwapper from "@/components/OptionsSwapper";
import { useEffect } from "react";

export default function Purchase() {
  const { phone, setPhone, setPaymentMethod } = useAppContext();

  useEffect(() => {
    setPaymentMethod("");
  }, []);

  return (
    <div className='purchase-page'>
      <div className='logo-container' style={{ aspectRatio: "363/197" }}>
        <Image
          src={"/images/AD-logo.png"}
          fill={true}
          className='logo'
          alt='Arban data logo'
        />
      </div>
      <div className='hero-container' style={{ aspectRatio: "681/261" }}>
        <Image
          src={"/images/hero-img.png"}
          fill={true}
          alt='hero image'
          className='hero-img'
        />
      </div>

      <div className='network-banner'>
        <h2>Network</h2>
        <div className='banner-container' style={{ aspectRatio: "594/142" }}>
          <div className='inner-banner' style={{ aspectRatio: "594/142" }}>
            <Image
              src={"/images/saf-img.png"}
              fill={true}
              alt='safaricom image'
              className='saf-img'
            />
          </div>
        </div>
      </div>

      <div className='user-input'>
        <h2>Enter your phone number</h2>
        <div className='input-container'>
          <div className='left-container'>
            <img src='/images/KE.png' alt='kenya flage image' />
            <span>+254</span>
          </div>
          <input
            type='text'
            placeholder='7XXXXXXXX'
            value={phone}
            onChange={(e) => setPhone(e.target.value.trim())}
          />
        </div>
      </div>

      <OptionsSwapper />
    </div>
  );
}
