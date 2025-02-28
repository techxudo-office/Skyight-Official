import { useEffect, useState } from "react";
import { MdCancel, MdOutlineCancel } from "react-icons/md";

const PopupMessage = ({active,onClose, message, icon }) => {
  const [status,setStatus] = useState()
  useEffect(() => {
    if (active) {
      setStatus(true)
      // const timer = setTimeout(() => setStatus(false), 3000);
      // return () => clearTimeout(timer);
    }else{
      setStatus(false)
    }
  }, [active]);

  return (
  <div className={`fixed top-14 md:top-20 border-secondary border rounded-l-md right-0 ${status?'translate-x-0':'translate-x-full'} transition-all duration-300 flex z-[999] items-center justify-center `}>
      <div className="bg-primary px-4 md:pr-12 py-2  shadow-lg flex items-center gap-4">
        {icon && <span className="text-2xl p-1 rounded-full bg-white text-primary">{icon}</span>}
        <p className="text-base md:text-lg text-white capitalize">{message}</p>
        <MdOutlineCancel className="text-redColor text-lg md:text-xl" onClick={onClose}/>
      </div>
    </div>
  );
};

export default PopupMessage;
