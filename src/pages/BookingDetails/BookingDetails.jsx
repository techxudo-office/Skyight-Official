import React, { useEffect, useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  CardLayoutContainer,
  CardLayoutHeader,
  CardLayoutBody,
  CardLayoutFooter,
} from "../../components/CardLayout/CardLayout";
import {
  Button,
  ConfirmModal,
  Tag,
  DownloadButton,
  Table,
  Spinner,
  CustomTooltip,
} from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IoIosAirplane,
  IoMdCash,
  IoMdClock,
  IoMdPaperPlane,
} from "react-icons/io";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelFlightBooking,
  getBookingDetails,
  getPenalty,
  getPNR,
  issueBooking,
  requestRefund,
} from "../../_core/features/bookingSlice";
import { MdArrowBack, MdOutlineCancelScheduleSend } from "react-icons/md";
import { RiRefund2Fill } from "react-icons/ri";
import ConfirmRefund from "./ConfirmRefund/ConfirmRefund";

dayjs.extend(utc); // Extend dayjs with UTC support

const TicketDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [refundConfirmation, setRefundConfirmation] = useState(false);
  const [confirmObject, setConfirmObject] = useState({
    onAbort: () => { },
    onConfirm: () => { },
    status: false,
    text: "",
    loading: false,
  });
  const { userData } = useSelector((state) => state.auth);
  const {
    isLoadingBookingDetails,
    bookingDetails,
    isLoadingPNR,
    isIssueLoading,
    isRefundLoading,
    isCancelling,
    isPenaltyLoading,
    penalties
  } = useSelector((state) => state.booking);
  // const [bookingDetails, setBookingDetails] = useState();

  const printRef = useRef();

  const downloadAsPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  };

  const handleIssue = async (pnr) => {
    dispatch(issueBooking({ pnr, token: userData?.token }))
      .unwrap()
      .then(() => {
        dispatch(
          getBookingDetails({ id: location.state.id, token: userData?.token })
        );
        setConfirmObject((prev) => ({ ...prev, status: false }));
      })
      .catch((error) => {
        dispatch(
          getBookingDetails({ id: location.state.id, token: userData?.token })
        );
        setConfirmObject((prev) => ({ ...prev, status: false }));
      });
  };

  const handleGetPnr = (pnr) => {
    if (!userData?.token) return;
    dispatch(getPNR({ id: pnr, token: userData?.token }))
      .unwrap()
      .then((result) => {
        if (result) {
          navigate("/dashboard/ticket-info", { state: result });
        }
      });
  };

  const cancelFlightBookingHandler = async (flight) => {
    const bookingId = {
      booking_id: flight.id,
    };
    dispatch(cancelFlightBooking({ data: bookingId, token: userData?.token }))
      .unwrap()
      .then(() => {
        dispatch(
          getBookingDetails({ id: location.state.id, token: userData?.token })
        );
        setConfirmObject((prev) => ({ ...prev, status: false }));
      })
      .catch((error) => {
        dispatch(
          getBookingDetails({ id: location.state.id, token: userData?.token })
        );
        setConfirmObject((prev) => ({ ...prev, status: false }));
      });
  };

  const refundRequestHandler = async (flight) => {
    setConfirmObject((prev) => ({ ...prev, status: false }));

    const bookingId = {
      booking_id: flight.id,
    };
    dispatch(requestRefund({ data: bookingId, token: userData?.token }))
      .unwrap()
      .then(() => {
        dispatch(
          getBookingDetails({ id: location.state.id, token: userData?.token })
        );
        setConfirmObject((prev) => ({ ...prev, status: false }));
      })
      .catch((error) => {
        dispatch(
          getBookingDetails({ id: location.state.id, token: userData?.token })
        );
        setConfirmObject((prev) => ({ ...prev, status: false }));
      });
  };


  useEffect(() => {
    if (location.state && userData?.token) {
      const refId = location.state.id;
      if (!userData?.token) return;
      dispatch(getBookingDetails({ id: refId, token: userData?.token })).then(
        (resp) => {
          // setBookingDetails(resp.payload);
        }
      );
    }
  }, [location.state, userData?.token]);

  const now = dayjs.utc();
  const timeLimit = dayjs(bookingDetails?.Timelimit);
  // const timeLimitLocal = (bookingDetails?.Timelimit).toISOString();


  const timelimit = new Date(bookingDetails?.Timelimit);
  const localTimeLimit = timelimit.toLocaleString("en-GB");

  if (isLoadingBookingDetails || isLoadingPNR || isIssueLoading) {
    return <Spinner className={"text-primary"} />;
  }
  const getPenaltyPayload = {
    Items:
      bookingDetails?.passengers.flatMap((traveler) =>
        traveler.passengertickets.map((ticket) => ({
          ticket_number: ticket.ticket_number,
          coupon_number: ticket.coupen_number,
          reference: "",
          zero_penalty: true,
        }))
      )

  }
  const handleRefund = async () => {
    try {
      // First fetch penalty data
      const result = await dispatch(
        getPenalty({ data: getPenaltyPayload, token: userData?.token })
      ).unwrap();

      // Then show confirmation with the penalty amount
      // setConfirmObject({
      //   loading: isRefundLoading,
      //   text: `Are you sure you want to refund? Penalty amount: ${result.amount} PKR`,
      //   status: true,
      //   onAbort: () => setConfirmObject(prev => ({ ...prev, status: false })),
      //   onConfirm: () => refundRequestHandler(bookingDetails),
      // });
      setRefundConfirmation(true);
      setConfirmObject((prev) => ({ ...prev, status: false }));

    } catch (error) {
      // Handle error
      toast.error("Failed to get penalty:", error);
    }
  }
  const passengerColumnData = [
    {
      name: "NAME",
      selector: (row) => row.given_name,
      sortable: false,


    },
    {
      name: "TYPE",
      selector: (row) => row.passenger_type_code,
      sortable: false,


    },
    {
      name: "BIRTH DATE",
      selector: (row) => dayjs(row.birth_date).format("D-MMM-YYYY"),
      sortable: false,


    },
    {
      name: "PASSPORT NUMBER",
      selector: (row) => row.doc_id,
      sortable: false,


    },
    {
      name: "EXPIRY",
      selector: (row) =>
        dayjs(row.expire_date).format("D-MMM-YYYY"),
      sortable: false,


    },
    {
      name: "ISSUANCE",
      selector: (row) => row.doc_issue_country,
      sortable: false,


    },
    {
      name: "NATIONALITY",
      selector: (row) => row.nationality,
      sortable: false,
    },
    {
      name: "TICKET NUMBER",
      selector: (row) => row.ticket_number || "-",
      sortable: false,
    },
    // bookingDetails?.booking_status=="confirmed" &&
    {
      name: "COUPON NUMBER",
      selector: (row) => row.coupen_number || "-",
      sortable: false,
    },

  ]
  return (
    <>
      <Toaster />
      <ConfirmModal {...confirmObject} />
      <ConfirmRefund isOpen={refundConfirmation} items={penalties?.PenaltyRS} onRequestClose={() => setRefundConfirmation(false)} />
      <div ref={printRef} className="flex flex-col w-full gap-5">
        <CardLayoutContainer>
          <CardLayoutBody className={"flex flex-wrap gap-3 justify-between"}>
            <div className="flex flex-col gap-3">
              <div className="py-4 text-3xl font-semibold text-text">
                <h1>
                  PNR:{" "}
                  <span className="text-primary">
                    {bookingDetails?.booking_reference_id}
                  </span>
                </h1>
                <h1 className="flex items-center gap-2 mt-2 w-fit ">
                  Status: <Tag value={bookingDetails?.booking_status} />
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <div>
                  <Button
                    icon={<RiRefund2Fill />}
                    loading={isPenaltyLoading}
                    onClick={handleRefund}
                    text={"Request Refund"}
                    disabled={bookingDetails?.booking_status !== "confirmed"}
                  />
                </div>
                <div>
                  <Button
                    icon={<MdOutlineCancelScheduleSend />}
                    onClick={() =>
                      setConfirmObject({
                        loading: isCancelling,
                        status: true,
                        text: "Are you really want to Cancel this Booking?",
                        onAbort: () =>
                          setConfirmObject((prev) => ({
                            ...prev,
                            status: false,
                          })),
                        onConfirm: () =>
                          cancelFlightBookingHandler(bookingDetails),
                      })
                    }
                    text={"Request Cancellation"}
                    disabled={bookingDetails?.booking_status !== "confirmed"}
                  />
                </div>
              </div>
            </div>

            <Button
              icon={<IoMdPaperPlane />}
              loading={isLoadingPNR}
              disabled={
                [
                  "requested-refund",
                  "expired",
                  "requested-cancellation",
                ].includes(bookingDetails?.booking_status)
                // || now.format("M/D/YYYY h:m:s a") > timeLimit.format("M/D/YYYY h:m:s a")
              }
              className="w-full text-xl py-14 md:w-44"
              text={
                bookingDetails?.booking_status === "confirmed"
                  ? "E-Ticket"
                  : "Order Ticket"
              }
              onClick={() => {
                if (bookingDetails?.booking_status === "confirmed") {
                  handleGetPnr(bookingDetails?.booking_reference_id);
                } else {
                  setConfirmObject({
                    loading: isIssueLoading,
                    status: true,
                    text: `Are you really want to order the ticket. The total fare is ${String(
                      bookingDetails?.total_fare
                    ).toLocaleString()} `,
                    onAbort: () =>
                      setConfirmObject((prev) => ({ ...prev, status: false })),
                    onConfirm: () =>
                      handleIssue(bookingDetails?.booking_reference_id),
                  });
                }
              }}
            />
          </CardLayoutBody>
          <CardLayoutBody>
            {bookingDetails?.flightSegments &&
              bookingDetails.flightSegments.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-5 py-5 max-sm:flex-wrap text-text"
                >
                  <div className="flex flex-col items-start">
                    <h2 className="mb-2 text-2xl font-semibold text-primary">
                      Departure
                    </h2>
                    <p className="text-xl font-bold">
                      {item.departure_airport}
                    </p>
                    <p className="flex items-center gap-2">
                      <IoMdClock className="text-lg text-primary" />
                      {dayjs(item.departure_datetime).format(
                        "MMM-DD-YYYY, hh:mm a"
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 max-sm:hidden text-primary">
                    <span className="h-0.5 rounded-full md:w-12 xl:w-28 bg-primary"></span>
                    <IoIosAirplane className="text-5xl" />
                    <span className="h-0.5 rounded-full md:w-12 xl:w-28 bg-primary"></span>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className="mb-2 text-2xl font-semibold text-primary">
                      Arrival
                    </h2>
                    <p className="text-xl font-bold">{item.arrival_airport}</p>
                    <p className="flex items-center gap-2">
                      <IoMdClock className="text-lg text-primary" />
                      {dayjs(item.arrival_datetime).format(
                        "MMM-DD-YYYY, hh:mm a"
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </CardLayoutBody>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <div className="flex flex-col gap-3 p-4 text-text">
            <div>
              <span className="font-semibold">Booked On: </span>
              {dayjs
                .utc(bookingDetails?.created_at)
                .format("DD MMM YYYY, h:mm a")}
            </div>
            <div>
              <span className="font-semibold">Booked by: </span>
              {bookingDetails?.user.first_name}
            </div>
            <div>
              <span className="font-semibold">TKT Time Limit: </span>
              {dayjs(bookingDetails?.Timelimit).format("DD MMM YYYY, h:mm a")}
            </div>
          </div>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader
            className={"mb-2 text-text"}
            heading="Passenger Details"
          />

          {bookingDetails && (
            <Table
              pagination={true}
              columnsData={[...passengerColumnData]}
              tableData={bookingDetails?.passengers || []}
              progressPending={isLoadingBookingDetails}
              paginationTotalRows={bookingDetails?.passengers.length}
              paginationComponentOptions={{ noRowsPerPage: "10" }}
            />
          )}
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader
            className={"mb-2 text-text"}
            heading={"Pricing Information"}
          />
          <h2 className="p-5 text-xl font-semibold text-text">
            Total Fare: {Number(bookingDetails?.total_fare).toLocaleString()}{" "}
            PKR
          </h2>
        </CardLayoutContainer>

        <div className="flex items-center justify-end gap-3 mb-4">
          <CustomTooltip content={"Previous Page"}>
            <div>
              <Button
                icon={<MdArrowBack />}
                id={"hide-buttons"}
                text="Go Back"
                onClick={() => {
                  navigate(-1);
                }}
              />
            </div>
          </CustomTooltip>
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
