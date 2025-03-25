"use client";
import SuccessStatus from "@/components/status/SuccessStatus";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "./style.css";
import IncompleteStatus from "@/components/status/IncompleteStatus";
import PendingStatus from "@/components/status/PendingStatus";
import NoNetwork from "@/components/status/NoNetwork";
import { BackendService } from "@/service/BackendService";
import { PurchaseBody } from "@/types/offers";
import ErrorStatus from "@/components/status/ErrorStatus";
import { useProgress } from "@bprogress/next";

export default function StatusPage() {
  const router = useRouter();
  const [pending, setPending] = useState(true);
  const [success, setSuccess] = useState(false);
  const [incomplete, setIncomplete] = useState(false);
  const [noNetwork, setNoNetwork] = useState(false);
  const [error, setError] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [pollCount, setPollCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { selectedOffer, formattedPhoneObj, paymentMethod, requestId } =
    useAppContext();
  const { start } = useProgress();

  const checkStatus = async () => {
    if (!selectedOffer || !formattedPhoneObj || !paymentMethod || !requestId) {
      start();
      router.push("/purchase");
      return;
    }

    if (isChecking) return;

    setIsChecking(true);

    try {
      const response = await BackendService.checkPurchaseStatus(
        requestId,
        `${selectedOffer?.resourceAccId}`
      );

      console.log(response.message);
      if (response.message.includes("success")) {
        setSuccess(true);
      } else if (response.message.includes("pending")) {
        setPending(true);
      } else if (response.message.includes("incomplete")) {
        setIncomplete(true);
      } else if (
        response.message.includes("error") ||
        response.message.includes("failed")
      ) {
        setError(true);
      }
    } catch (err) {
      setNoNetwork(true);
    } finally {
      setPending(false);
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (pollCount < 20 && pending) {
      timeoutRef.current = setTimeout(async () => {
        checkStatus().then(() => {
          setPollCount(pollCount + 1);
        });
      }, 1000);
    } else if (pollCount >= 20 && pending) {
      setPending(false);
      setIncomplete(true);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    selectedOffer,
    formattedPhoneObj,
    paymentMethod,
    router,
    error,
    success,
    pollCount,
    pending,
    incomplete,
  ]);

  return (
    <div className='status-page'>
      {/* <PendingStatus checkStatus={checkStatus} /> */}

      {success && <SuccessStatus />}
      {incomplete && <IncompleteStatus />}
      {pending && <PendingStatus checkStatus={checkStatus} />}
      {noNetwork && <NoNetwork />}
      {error && <ErrorStatus />}
    </div>
  );
}
