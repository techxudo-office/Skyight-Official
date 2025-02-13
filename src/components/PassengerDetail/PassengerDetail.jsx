import { FaUser } from "react-icons/fa";
import Flag from "react-world-flags";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { MdChildCare, MdChildFriendly } from "react-icons/md";

const passengers = [
    { name: "MR MUHAMMAD NAUMAN TASHFEEN", type: "Adult" },
    { name: "MRS AYSHA HAMEED GHAURI", type: "Adult" },
    { name: "MS AYRA TASHFEEN", type: "Child" },
    { name: "MS MAHASIN TASHFEEN", type: "Infant" }
];

const PassengerDetail = () => {
    return (
        <CardLayoutContainer className={' my-4 p-5'}>

            <h2 className="text-xl text-text font-semibold mb-3">Passenger Details</h2>

            <div className="">
                {passengers.map((passenger, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-3 mb-2 text-base h-28 bg-bluebg  p-4 rounded-lg border border-gray py-9"
                    >

                        {/* Country Flag Icon (Pakistan) using react-world-flags */}
                        <div className="flex items-center gap-3">
                            <Flag code="PK" className="w-6 h-4 " />

                            {/* Passenger Name */}
                            <p className="font-semibold text-text leading-5">{passenger.name}</p>
                        </div>
                        <div className="flex pl-7 items-center gap-1">
                            {/* Placeholder Icon (for booking class, etc.) */}
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                                <FaUser size={12} />

                            </span>
                            <span className="text-gray-500">-</span>
                        </div>
                        {/* Passenger Type (Adult/Child) */}
                        <div className="flex items-center gap-1 text-text">
                            {passenger.type=='Adult'?<FaUser className="text-sm" />:passenger.type=='Child'?<MdChildCare className="text-lg"/>:<MdChildFriendly className="text-lg"/>}
                            <p className="font-semibold">{passenger.type}</p>
                        </div>



                    </div>
                ))}
            </div>

        </CardLayoutContainer>

    );
};

export default PassengerDetail;
