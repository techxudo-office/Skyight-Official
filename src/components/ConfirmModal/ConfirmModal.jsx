import React, { useEffect, useRef } from "react";
import { Button, SecondaryButton } from "../components";

const ConfirmModal = ({ status, onAbort, onConfirm, text, loading }) => {
  const modalRef = useRef();

  useEffect(() => {
    const outsideClickHandler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onAbort;
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  }, [modalRef]);

  return (
    <>
      <div
        ref={modalRef}
        className={`transition-all absolute z-10 ${status ? "top-16" : "top-[-100%]"
          } left-[50%] translate-x-[-50%]`}
      >
        <div
          className={
            "shadow-2xl min-w-[450px] border bg-primary  pt-5 pb-3 rounded-b-2xl flex flex-col gap-3 "
          }
        >
          <h2 className="px-4 text-2xl font-semibold text-white ">
            Confirmation
          </h2>

          <h2 className="px-4 py-3 text-xl text-white border-t border-b border-background">
            {text}
          </h2>

          <div className={"gap-2 flex justify-end px-4 "}>
            <div>
              <SecondaryButton
                text="Confirm"
                onClick={onConfirm}
                loading={loading}
                disabled={loading}
              />
            </div>
            <div>
              <Button
                text="Cancel"
                className="bg-redColor"
                onClick={onAbort}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
