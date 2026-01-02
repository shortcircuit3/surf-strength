"use client";

import { useState, ReactNode } from "react";

interface CheckoutButtonProps {
  children: ReactNode;
  className?: string;
}

export default function CheckoutButton({
  children,
  className = "",
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("Checkout error:", data.error, data.details);
        alert(`Checkout error: ${data.error || "Unknown error"}`);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to start checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleCheckout} disabled={isLoading} className={className}>
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
