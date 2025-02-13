import { useEffect, useState } from "react";

const PopupMessage = ({active, message, icon }) => {
  const [status,setStatus] = useState()
  useEffect(() => {
    if (active) {
        setStatus(true)
      const timer = setTimeout(() => setStatus(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  if (!status) return null;

  return (
    <div className="fixed inset-0 flex z-[999] items-center justify-center ">
      <div className="bg-white border border-primary p-6 rounded-lg shadow-lg flex items-center gap-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <p className="text-lg">{message}</p>
      </div>
    </div>
  );
};

export default PopupMessage;
