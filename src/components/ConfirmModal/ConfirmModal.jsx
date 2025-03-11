import React, { useEffect, useRef } from "react";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
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
        className={`transition-all absolute z-10 ${
          status ? "top-3" : "top-[-100%]"
        } left-[50%] translate-x-[-50%]`}
      >
        <CardLayoutContainer className={"shadow-xl"}>
          <CardLayoutHeader className="flex items-center justify-between rounded-t-3xl">
            <h2 className="text-xl font-semibold text-text">Confirmation</h2>
          </CardLayoutHeader>
          <CardLayoutBody>
            <h2 className="text-xl text-text">{text}</h2>
          </CardLayoutBody>
          <CardLayoutFooter className={"gap-1"}>
            <div>
              <SecondaryButton text="Cancel" onClick={onAbort} />
            </div>
            <div>
              <Button
                text="Confirm"
                loading={loading}
                className="bg-red-500 hover:bg-red-700"
                onClick={onConfirm}
              />
            </div>
          </CardLayoutFooter>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default ConfirmModal;
