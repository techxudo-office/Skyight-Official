import React, { useState } from 'react';
import { Button, ModalWrapper } from '../../../components/components';

export default function ConfirmRefund({
    isOpen,
    onRequestClose,
    items = [],
    onRefund,
    refundButtonText = "Refund",
    loadingText = "Processing..."
}) {
    const [selectedItems, setSelectedItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log("items", items)
    const handleCheckboxChange = (itemId) => {
        setSelectedItems(prev =>
            prev.includes(itemId)
                ? prev.filter(id => id !== itemId)
                : [...prev, itemId]
        );
    };

    const handleRefund = async () => {
        if (selectedItems.length === 0) return;

        setIsLoading(true);
        try {
            await onRefund(selectedItems);
            onRequestClose();
            setSelectedItems([]);
        } catch (error) {
            console.error("Refund failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ModalWrapper
            contentLabel="Confirm Refund"
            isOpen={isOpen}
            onRequestClose={onRequestClose}
        >
            <div className="p-6 w-full max-w-md mx-auto">
                {/* Header */}
                <h2 className="text-2xl font-bold text-six mb-6 text-center">
                    Select Items to Refund
                </h2>

                {/* Items List */}
                <div className=" mb-6 space-y-3">
                    {items.map((item, idx) => (
                        <div
                            key={item.id}
                            className={`flex items-center p-4 rounded-lg border ${selectedItems.includes(idx) ? 'border-primary bg-primary/10' : 'border-gray-200'}`}
                        >
                            <input
                                type="checkbox"
                                id={`item-${idx}`}
                                checked={selectedItems.includes(idx)}
                                onChange={() => handleCheckboxChange(idx)}
                                className="h-5 w-5 text-primary rounded focus:ring-primary border-gray-300"
                            />
                            <label
                                htmlFor={`item-${idx}`}
                                className="ml-3 flex-1 flex justify-between items-center"
                            >
                                <span className="font-medium text-six">Ticket #{item.TicketNumber}</span>
                                <span className="font-semibold text-primary">${item.Penalty}</span>
                            </label>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-3">
                    <Button onClick={onRequestClose} loading={isLoading} text={"Cancel"} className='bg-red-700 hover:bg-red-600' />
                    <button
                        onClick={handleRefund}
                        disabled={selectedItems.length === 0 || isLoading}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedItems.length === 0 || isLoading
                            ? 'bg-primary/50 cursor-not-allowed'
                            : 'bg-primary hover:bg-primary/90'} text-white`}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {loadingText}
                            </span>
                        ) : refundButtonText}
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
}