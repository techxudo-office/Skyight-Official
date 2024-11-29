import React, { useState } from "react";
import plane from "../../assets/images/plane.webp";

import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";

import { Select, Input, Spinner, Button } from "../../components/components";

import { iranianCities } from "../../data/iranianCities";

import { FaPlaneDeparture } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SearchFlights = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    departure: "",
    arrival: "",
    departureDate: "",
    returnDate: "",
    adult: "1",
    child: "0",
    infant: "0",
    class: "",
  });

  const [loading, setLoading] = useState(false);

  const adultOptions = [
    { value: "1", label: "1 Adult" },
    { value: "2", label: "2 Adult" },
    { value: "3", label: "3 Adult" },
    { value: "4", label: "4 Adult" },
    { value: "5", label: "5 Adult" },
    { value: "6", label: "6 Adult" },
    { value: "7", label: "7 Adult" },
    { value: "8", label: "8 Adult" },
    { value: "9", label: "9 Adult" },
    { value: "10", label: "10 Adult" },
  ];
  const childOptions = [
    { value: "1", label: "1 Child" },
    { value: "2", label: "2 Child" },
    { value: "3", label: "3 Child" },
    { value: "4", label: "4 Child" },
    { value: "5", label: "5 Child" },
    { value: "6", label: "6 Child" },
    { value: "7", label: "7 Child" },
    { value: "8", label: "8 Child" },
    { value: "9", label: "9 Child" },
    { value: "10", label: "10 Child" },
  ];
  const infantoptions = [
    { value: "1", label: "1 Infant" },
    { value: "2", label: "2 Infant" },
    { value: "3", label: "3 Infant" },
    { value: "4", label: "4 Infant" },
    { value: "5", label: "5 Infant" },
    { value: "6", label: "6 Infant" },
    { value: "7", label: "7 Infant" },
    { value: "8", label: "8 Infant" },
    { value: "9", label: "9 Infant" },
    { value: "10", label: "10 Infant" },
  ];

  return (
    <>
      <div className="flex flex-col w-full items-center justify-center">
        <CardLayoutContainer className="w-full mb-5">
          <CardLayoutHeader
            className="flex items-center justify-start flex-wrap gap-5 py-3"
            removeBorder={true}
          >
            <img src={plane} alt="profile-img" className=" h-60 w-full" />
          </CardLayoutHeader>
        </CardLayoutContainer>

        <CardLayoutContainer>
          <CardLayoutHeader
            heading="Search Flight"
            className={"flex items-center justify-between"}
          />
          <CardLayoutBody>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5 mb-7">
              <Select
                id="departure"
                label="Departure From"
                name="departure"
                options={iranianCities}
                value={formState.departure}
                placeholder="Select Departure..."
                onChange={(option) =>
                  setFormState({ ...formState, departure: option })
                }
                optionIcons={<FaPlaneDeparture />}
              />
              <Select
                id="arrival"
                label="Arrival To"
                name="arrival"
                options={iranianCities}
                value={formState.arrival}
                placeholder="Select Arrival..."
                onChange={(option) =>
                  setFormState({ ...formState, arrival: option })
                }
                optionIcons={<FaPlaneDeparture />}
              />
              <Input
                placeholder={"Select Departure Date"}
                id={"departureDate"}
                name={"departureDate"}
                label={"Departure Date"}
                type={"date"}
                value={formState.departureDate}
                onChange={(e) => {
                  setFormState({ ...formState, departureDate: e.target.value });
                }}
              />
              <Select
                id="adult"
                label="Adult"
                name="adult"
                options={adultOptions}
                value={formState.adult}
                placeholder="Select Adults..."
                onChange={(option) =>
                  setFormState({ ...formState, adult: option })
                }
                optionIcons={<FaUser />}
              />
              <Select
                id="child"
                label="Child"
                name="child"
                options={childOptions}
                value={formState.child}
                placeholder="Select Childs..."
                onChange={(option) =>
                  setFormState({ ...formState, child: option })
                }
                optionIcons={<FaUser />}
              />
              <Select
                id="infant"
                label="Infant"
                name="infant"
                options={infantoptions}
                value={formState.infant}
                placeholder="Select Infants..."
                onChange={(option) =>
                  setFormState({ ...formState, infant: option })
                }
                optionIcons={<FaUser />}
              />
            </div>
          </CardLayoutBody>
          <CardLayoutFooter>
            <div>
              <Button
                text={loading ? <Spinner /> : "Search Flight"}
                disabled={loading}
                onClick={() => {
                  navigate("/dashboard/flight-results");
                }}
              />
            </div>
          </CardLayoutFooter>
        </CardLayoutContainer>
      </div>
    </>
  );
};

export default SearchFlights;
