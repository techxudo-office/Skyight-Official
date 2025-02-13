import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React from "react";
import { FlagIcon } from "react-flag-kit";
import { FlightDetailCard, FlightInfoCard } from "../components";

const DownloadButton = () => {


    const printRef = React.useRef()
    const handleDownloadPdf = async () => {
        const element = printRef.current
        if (!element) {
            return
        } else {
            console.log(element)
            const canvas = await html2canvas(element,{
                scale:2
            })
            const data = canvas.toDataURL("image/png")
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "px",
                format: "a4"
            })
            const imageProperties = pdf.getImageProperties(data)
            const pdfWidth = pdf.internal.pageSize.getWidth()
            const pdfHeight = (imageProperties.height * pdfWidth) / imageProperties.width
            pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight)
            pdf.save("ETicket.pdf")
        }
    }

    const passengers = [
        { title: "MR", firstName: "MUHAMMAD NAUMAN", lastName: "TASHFEEN", type: "ADT", birthDate: "Feb 01, 1980", nationalID: "3210274304327", passport: "-", ticket: "2470791785" },
        { title: "MRS", firstName: "AYSHA HAMEED", lastName: "GHAURI", type: "ADT", birthDate: "Apr 10, 1987", nationalID: "3210244014434", passport: "-", ticket: "2470791785" },
        { title: "MS", firstName: "AYRA", lastName: "TASHFEEN", type: "CNN", birthDate: "Apr 09, 2015", nationalID: "3210244014434", passport: "-", ticket: "2470791786" },
        { title: "MS", firstName: "MAHASIN", lastName: "TASHFEEN", type: "CNN", birthDate: "Sep 23, 2021", nationalID: "3210244014434", passport: "-", ticket: "2470791786" },
    ];
    return (
        <>
            <div ref={printRef} className="absolute -left-[9999px]  w-full mx-auto bg-white shadow-lg rounded-md p-4 border">
                {/* Header */}
                <div className="text-center font-bold text-lg border-b pb-2">
                    E-Ticket Receipt & Itinerary
                </div>

                {/* Airline Info */}
                <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-2">
                        <img src="/pia-logo.svg" alt="PIA Logo" className="h-10" />
                        <span className="font-bold text-lg">PIA</span>
                    </div>
                    <div className="text-green-600 font-bold text-xl">95UH6</div>
                </div>

                {/* Booking & Flight Details */}
                <div className="grid grid-cols-2 gap-2 bg-gray-100 p-2 rounded-md text-sm">
                    <div>
                        <p className="font-semibold">Agency</p>
                        <p>C & M TRAVEL & TOURISM (PVT) LTD</p>
                    </div>
                    <div>
                        <p className="font-semibold">PNR Number</p>
                        <p>95UH6</p>
                    </div>
                    <div>
                        <p className="font-semibold">Booking Date</p>
                        <p>MON, FEB 10, 2025 11:37</p>
                    </div>
                    <div>
                        <p className="font-semibold">Status</p>
                        <p className="text-green-600 font-bold">TICKET ISSUED</p>
                    </div>
                </div>

                {/* Flight Details */}
                <div className="mt-4 bg-green-600 text-white p-2 rounded-t-md font-semibold">
                    FLIGHT DETAILS
                </div>
                <div className="border p-2">
                    <p className="font-bold">
                        Karachi [KHI] → Multan [MUX]
                    </p>
                    <p>Fri, Mar 28, 2025</p>
                    <div className="flex items-center space-x-2 mt-2">
                        <img src="/pia-plane.svg" alt="Flight Icon" className="h-5" />
                        <p className="font-semibold">Pakistan International Airlines</p>
                    </div>
                    <div className="flex justify-between text-sm mt-1">
                        <span>20:15 KHI</span>
                        <span>→</span>
                        <span>21:40 MUX</span>
                    </div>
                    <p className="text-xs text-gray-600">Flight Time: 1 Hour 25 minutes | PK-330</p>
                </div>

                {/* Passenger Details */}
                <div className="mt-4 bg-green-600 text-white p-2 rounded-t-md font-semibold">
                    PASSENGER DETAILS
                </div>
                <div className="border p-2">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-gray-100">
                                <th className="p-2">Title</th>
                                <th className="p-2">First Name</th>
                                <th className="p-2">Last Name</th>
                                <th className="p-2">Passenger Type</th>
                                <th className="p-2">Birth Date</th>
                                <th className="p-2">National ID</th>
                                <th className="p-2">Passport</th>
                                <th className="p-2">Ticket Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {passengers.map((passenger, index) => (
                                <tr key={index} className="border-b">
                                    <td className="p-2">{passenger.title}</td>
                                    <td className="p-2">{passenger.firstName}</td>
                                    <td className="p-2">{passenger.lastName}</td>
                                    <td className="p-2">{passenger.type}</td>
                                    <td className="p-2">{passenger.birthDate}</td>
                                    <td className="p-2">{passenger.nationalID}</td>
                                    <td className="p-2">{passenger.passport}</td>
                                    <td className="p-2">{passenger.ticket}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
            <button className="p-3 bg-primary text-white " onClick={handleDownloadPdf}>
                Download
            </button>
        </>

    );
};

export default DownloadButton;

