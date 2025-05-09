import React, { useState } from "react";
import { Button, ModalWrapper } from "../../../components/components";

export default function ConfirmRefund({
  isOpen,
  onRequestClose,
  items = [],
  loading,
  onRefund,
  refundButtonText = "Refund",
  loadingText = "Processing...",
}) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRefund = async () => {
    // if (selectedItems.length === 0) return;

    try {
      await onRefund(selectedItems);
      onRequestClose();
      setSelectedItems([]);
    } catch (error) {
      console.error("Refund failed:", error);
    }
  };

  return (
    <ModalWrapper
      contentLabel="Confirm Refund"
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <div className="w-full max-w-md p-2 mx-auto md:p-6">
        {/* Header */}
        <h2 className="mb-6 text-2xl font-bold text-center text-six">
          Select Items to Refund
        </h2>

        {/* Items List */}
        <div className="mb-6 space-y-3 overflow-x-auto min-w-80 max-md:text-sm">
          <span className="flex items-center justify-between p-2 mb-2 font-semibold rounded-md text-six bg-background text-text">
            <p>Ticket #</p>
            <p className="translate-x-10">Coupon #</p>
            <p>Penalty</p>
          </span>
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center p-4 rounded-lg border ${
                selectedItems.includes(idx)
                  ? "border-primary bg-primary/10"
                  : "border-gray-200"
              }`}
            >
              <input
                type="checkbox"
                id={`item-${idx}`}
                // disabled={true}
                checked={selectedItems.includes(idx)}
                onChange={() => handleCheckboxChange(idx)}
                className="w-5 h-5 border-gray-300 rounded text-primary focus:ring-primary"
              />
              <label
                htmlFor={`item-${idx}`}
                className="flex items-center justify-between w-full ml-3"
              >
                <span className="font-medium text-six">
                  {" "}
                  {item.TicketNumber}
                </span>
                <span className="font-medium text-six ">
                  {" "}
                  {item.CouponNumber}
                </span>
                <span className="font-semibold text-primary">
                  PKR {item.pkrPenalty.toLocaleString()}
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <Button
            onClick={onRequestClose}
            text={"Cancel"}
            className="bg-red-700 hover:bg-red-600"
          />
          <Button onClick={onRefund} loading={loading} text={"Refund"}></Button>
        </div>
      </div>
    </ModalWrapper>
  );
}
