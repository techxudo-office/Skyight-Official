import { FaChevronCircleDown, FaChevronDown, FaUser } from "react-icons/fa";
import Flag from "react-world-flags";
import { CardLayoutContainer } from "../CardLayout/CardLayout";
import { MdChildCare, MdChildFriendly } from "react-icons/md";
import { useState } from "react";



const PassengerDetail = ({ travelersData }) => {
    console.log('travelersData',travelersData)
    const [dropdown, setDropdown] = useState(null)
    const handleDropdown=(index)=>{
        if(dropdown==index){
            setDropdown(null)
        }else{
            setDropdown(index)
        }
    }
    return (
        <CardLayoutContainer className={' my-4 p-5'}>

            <h2 className="text-xl text-text font-semibold mb-3">Passenger Details</h2>

            <div className="">
                {travelersData&&travelersData.map((passenger, index) => (
                    <>
                        <div
                        onClick={() => handleDropdown(index)} 
                            key={index}
                            className="grid grid-cols-3 mb-2 text-base h-28 bg-bluebg  p-4 rounded-lg border border-gray py-9"
                        >
                            {/* Country Flag Icon (Pakistan) using react-world-flags */}
                            <div className="flex justify-center items-center gap-3">
                                <Flag code="PK" className="w-6 h-4 " />
                                {/* Passenger Name */}
                                <p className="font-semibold text-text leading-5">{passenger.first_name} {passenger.last_name}</p>
                            </div>
                            {/* <div className="flex pl-7 items-center gap-1">
                                <span className="bg-primary text-white text-xs px-2 py-1 rounded">
                                    <FaUser size={12} />

                                </span>
                                <span className="text-gray-500">-</span>
                            </div> */}
                            {/* Passenger Type (Adult/Child) */}
                            <div className="flex justify-center items-center gap-1 text-text">
                                {passenger.passenger_type == 'ADT' ? <FaUser className="text-sm" /> : passenger.passenger_type == 'CHD' ? <MdChildCare className="text-lg" /> : <MdChildFriendly className="text-lg" />}
                                <p className="font-semibold">{passenger.passenger_type == 'ADT' ? 'Adult' : passenger.passenger_type == 'CHD' ? 'Child' : 'Infant'}</p>
                            </div>
                            <button className={`${dropdown==(index)?'rotate-180':''} flex justify-self-end transition-all duration-300 h-fit bg-primary w-fit text-white text-xl p-1 rounded-full`}>
                                <FaChevronDown onClick={() =>handleDropdown(index)}  />

                            </button>


                        </div>

                       {<div className={`${dropdown==(index) ? 'h-fit pb-4' : 'h-0 -translate-y-5 opacity-50 overflow-hidden'} px-4 w-full lg:w-1/2  mx-auto transition-all duration-300`}>
                            <div className=" mt-5 rounded-xl p-7 bg-secondary shadow-lg border-gray border-[1px]">
                                <h1 className="text-white font-semibold text-2xl pb-3">{passenger.first_name}'s Details</h1>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">title <span>{passenger.title}</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">First name <span>{passenger.first_name}</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">last name <span>{passenger.last_name}</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">date of birth <span>{passenger.date_of_birth}</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">gender <span>{passenger.gender}</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">nationality <span>{passenger.country}</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold text-white ">Mobile <span>{Number(Object.values(passenger.mobile).join("")) }</span></p>
                                <p className=" py-4 flex justify-between border-b border-lightgray capitalize font-semibold  text-white">Passport no. <span>{passenger.passport_number}</span></p>
                            </div>
                        </div>}
                    </>
                ))}
            </div>

        </CardLayoutContainer>

    );
};

export default PassengerDetail;
