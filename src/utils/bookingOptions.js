export const adultOptions = [
  { value: "1", label: "1 Adult" },
  { value: "2", label: "2 Adult" },
  { value: "3", label: "3 Adult" },
  { value: "4", label: "4 Adult" },
  { value: "5", label: "5 Adult" },
];

export const childOptions = [
  { value: "0", label: "0 Child" },
  { value: "1", label: "1 Child" },
  { value: "2", label: "2 Child" },
];

export const infantOptions = [
  { value: "0", label: "0 Infant" },
  { value: "1", label: "1 Infant" },
  { value: "2", label: "2 Infant" },
];
export const cabinClassOptions = [
  { value: "Economy", label: "Economy" },
  { value: "Business", label: "Business" },
  { value: "First Class", label: "First Class" },
  { value: "Premium Economy", label: "Premium Economy" },
];


export const initialState = {
  departure: false,
  arrival: false,
  departureDate: false,
  returnDate: false,
  cabinClass: false,
  adult: false,
  child: false,
  infant: false,
};
