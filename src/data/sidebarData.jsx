import { GoDotFill } from "react-icons/go";

import { RiDashboardFill } from "react-icons/ri";
import { MdContentPasteSearch } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoIosStopwatch } from "react-icons/io";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaHandsHelping } from "react-icons/fa";

export const sidebarLinks = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <RiDashboardFill />,
  },
  {
    title: "Flights & Hotels",
    icon: <MdContentPasteSearch />,
    sublinks: [
      {
        title: "Search Flights",
        path: "/dashboard/search-flights",
        icon: <GoDotFill />,
      },
      {
        title: "Search Hotels",
        path: "/dashboard/search-hotels",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Bookings",
    icon: <FaBusinessTime />,
    sublinks: [
      {
        title: "Flight Bookings",
        path: "/dashboard/flight-bookings",
        icon: <GoDotFill />,
      },
      {
        title: "Hotel Bookings",
        path: "/dashboard/hotel-bookings",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Credits",
    icon: <FaCreditCard />,
    sublinks: [
      {
        title: "Credit Topup",
        path: "/dashboard/credit-topup",
        icon: <GoDotFill />,
      },
      {
        title: "Add Credits",
        path: "/dashboard/add-credits",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Payments & Invoices",
    icon: <FaMoneyBill1Wave />,
    sublinks: [
      {
        title: "Invoices",
        path: "/dashboard/invoices",
        icon: <GoDotFill />,
      },
      {
        title: "Make Payment",
        path: "/dashboard/make-payment",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "History",
    icon: <IoIosStopwatch />,
    sublinks: [
      {
        title: "Search History",
        path: "/dashboard/search-history",
        icon: <GoDotFill />,
      },
      {
        title: "Transactions History",
        path: "/dashboard/transactions-history",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Administrator",
    icon: <MdAdminPanelSettings />,
    sublinks: [
      {
        title: "Roles",
        path: "/dashboard/roles",
        icon: <GoDotFill />,
      },
      {
        title: "Create Role",
        path: "/dashboard/create-role",
        icon: <GoDotFill />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <GoDotFill />,
      },
      {
        title: "Create User",
        path: "/dashboard/create-user",
        icon: <GoDotFill />,
      },
    ],
  },
  {
    title: "Help & Support",
    icon: <FaHandsHelping />,
    sublinks: [
      {
        title: "Support",
        path: "/dashboard/support",
        icon: <GoDotFill />,
      },
    ],
  },
];
