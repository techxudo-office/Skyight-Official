import React, { useState } from "react";
import { Button, ModalWrapper } from "../../../components/components";

export default function ConfirmRefund({
    isOpen,
    onRequestClose,
    items = [],
    loading,
    onRefund,
    refundButtonText = "Refund",
    loadingText = "Processing..."
}) {
    const [selectedItems, setSelectedItems] = useState([]);

    const handleCheckboxChange = (item) => {
        setSelectedItems(prev => {
            // Check if item is already selected
            const isSelected = prev.some(selected => selected.TicketNumber === item.TicketNumber);

            if (isSelected) {
                // Remove if already selected
                return prev.filter(selected => selected.TicketNumber !== item.TicketNumber);
            } else {
                // Add if not selected
                return [...prev, item];
            }
        });
    };

    const handleRefund = async () => {
        if (selectedItems.length === 0) return;
        console.log(selectedItems, "selectedItems")
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
            <div className="p-2 md:p-6 w-full max-w-md mx-auto">
                {/* Header */}
                <h2 className="text-2xl font-bold text-six mb-6 text-center">
                    Select Items to Refund
                </h2>

                {/* Items List */}
                <div className=" mb-6 space-y-3 min-w-80 overflow-x-auto max-md:text-sm">
                    <span className='flex items-center justify-between text-six font-semibold mb-2 bg-background text-text p-2 rounded-md'>
                        <p>Ticket #</p>
                        <p className='translate-x-10'>Coupon #</p>
                        <p>Penalty</p>
                    </span>
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`flex items-center p-4 rounded-lg border ${selectedItems.some(selected => selected.TicketNumber === item.TicketNumber) ? 'border-primary bg-primary/10' : 'border-gray-200'}`}
                        >
                            <input
                                type="checkbox"
                                id={`item-${idx}`}
                                checked={selectedItems.some(selected => selected.TicketNumber === item.TicketNumber)}
                                onChange={() => handleCheckboxChange(item)}
                                className="h-5 w-5 text-primary rounded focus:ring-primary border-gray-300"
                            />
                            <label
                                htmlFor={`item-${idx}`}
                                className="ml-3 w-full flex justify-between items-center"
                            >
                                <span className="font-medium text-six"> {item.TicketNumber}</span>
                                <span className="font-medium text-six "> {item.CouponNumber}</span>
                                <span className="font-semibold text-primary">PKR {item.pkrPenalty.toLocaleString()}</span>
                            </label>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <Button onClick={onRequestClose} text={"Cancel"} className='bg-red-700 hover:bg-red-600' />
                    <Button
                        onClick={handleRefund}
                        loading={loading}
                        text={"Refund"}
                        disabled={loading || selectedItems.length === 0}
                    >
                    </Button>
                </div>
            </div>
        </ModalWrapper>
    );
}
