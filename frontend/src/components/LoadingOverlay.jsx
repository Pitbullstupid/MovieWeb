import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function LoadingOverlay({ loading }) {
  const [visible, setVisible] = useState(loading);

  useEffect(() => {
    if (loading) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center
        bg-[#3b3d47]/50 backdrop-blur-sm
        transition-all duration-300
        ${loading ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"}
      `}
      style={{ display: visible ? "flex" : "none" }}
    >
      <div className="flex items-center">
        <p className="mt-3 text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#db5840] to-[#b6b2b2]">
          MovieWeb
        </p>
        <Spinner className="mt-5 text-[#FFD875] ml-3" />
      </div>
    </div>
  );
}
