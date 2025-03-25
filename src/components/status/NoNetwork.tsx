"use client";
import { WifiIconSvg } from "@/assets/icons";
import "./style.css";
import { useRouter } from "next/navigation";
import { useProgress } from "@bprogress/next";
export default function NoNetwork() {
  const router = useRouter();
  const { start } = useProgress();

  const handleClick = () => {
    start();
    router.push("/purchase");
  };
  return (
    <div className='status-container network-status'>
      <WifiIconSvg />
      <p className='like-entice more-space'>No network, please try again </p>
      <button
        className='typical-ad-button-con status-btn'
        onClick={handleClick}
      >
        Retry
      </button>
    </div>
  );
}
