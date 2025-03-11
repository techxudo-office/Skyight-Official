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
  Spinner,
  SecondaryButton,
  TableNew,
  ConfirmModal,
  Tag,
  DownloadButton,
} from "../../components/components";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import {
  cancelFlightBooking,
  issueBooking,
  refundRequest,
} from "../../utils/api_handler";
import { IoIosAirplane, IoMdClock } from "react-icons/io";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import UTC plugin
import { MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getBookingDetails, getPNR } from "../../_core/features/bookingSlice";

dayjs.extend(utc); // Extend dayjs with UTC support

const TicketDetails = () => {
  const printRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [getPnr, setGetPnr] = useState(null);
  const [confirmObject, setConfirmObject] = useState({
    onAbort: "",
    onConfirm: "",
    status: false,
    text: "",
  });
  const { userData } = useSelector((state) => state.auth);
  const { bookingDetails } = useSelector((state) => state.booking);


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
  const printHandler = () => {
    window.print();
  };

  const downloadHandler = async () => {
    // alert("download handler");
    const response = await getPNR(bookingDetails?.booking_reference_id);
    console.log(response);
    // downloadAsPDF();
  };

  const handleIssue = async (pnr) => {
    const response = await issueBooking(pnr);
    if (response.status) {
      toast.success(
        `Ordered Successfully Total Fare: ${bookingDetails?.total_fare}`
      );
      setConfirmObject((prev) => ({ ...prev, status: false }));
    }
  };

  const handleGetPnr = (pnr) => {
    dispatch(getPNR({ id: pnr, token: userData?.token }))
      .unwrap()
      .then((result) => {
        if (result) {
          navigate("/dashboard/ticket-info", { state: result });
        }
      });
  };

  const cancelFlightBookingHandler = async (flight) => {
    console.log(flight);

    const bookingId = {
      booking_id: flight.id,
    };

    console.log(bookingId);

    let response = await cancelFlightBooking(bookingId);
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setConfirmObject((prev) => ({ ...prev, status: false }));
  };

  const refundRequestHandler = async (flight) => {
    console.log(flight);

    const bookingId = {
      booking_id: flight.id,
    };
    console.log(bookingId);
    let response = await refundRequest(bookingId);
    if (response.status) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
    setConfirmObject((prev) => ({ ...prev, status: false }));
  };

  useEffect(() => {
    if (location.state) {
      const refId = location.state.id;
      dispatch(getBookingDetails({ id: refId, token: userData?.token }));
    }
  }, [location.state, userData?.token]);

  useEffect(() => {
    console.log(bookingDetails, "bookingDetails from state"); // ✅ Should log the correct value now
  }, [bookingDetails]);

  const now = dayjs.utc();
  const timeLimit = dayjs(bookingDetails?.Timelimit);
  // const timeLimitLocal = (bookingDetails?.Timelimit).toISOString();

  console.log("Current UTC:", now.format("M/D/YYYY h:m:s a"));
  console.log("Time Limit UTC:", timeLimit.format("M/D/YYYY h:m:s a"));
  // console.log("Time Limit local:", dayjs(timeLimitLocal).local().format('DD MMMM YYYY, h:mm a'));

  console.log(
    "Comparison result:",
    now.format("M/D/YYYY h:m:s a") > timeLimit.format("M/D/YYYY h:m:s a")
  );
  const timelimit = new Date(bookingDetails?.Timelimit);
  const localTimeLimit = timelimit.toLocaleString("en-GB");

  return (
    <>
      <Toaster />
      {getPnr && <DownloadButton data={getPnr} />}
      <ConfirmModal
        onAbort={confirmObject.onAbort}
        onConfirm={confirmObject.onConfirm}
        status={confirmObject.status}
        text={confirmObject.text}
      />
      <div ref={printRef} className="flex flex-col w-full gap-5">
        <CardLayoutContainer>
          <CardLayoutBody className={"flex flex-col md:flex-row justify-between"}>
            <div className="flex flex-col gap-3">
              <div className="py-4 text-xl md:text-3xl font-semibold text-text">
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
                {/* <div>
                <Button
                  id={"hide-buttons"}
                  onClick={printHandler}
                  text={"Print Ticket"}
                />
              </div>
              <div>
                <Button
                  id={"hide-buttons"}
                  onClick={downloadHandler}
                  text={"Download"}
                />
              </div> */}
                <div>
                  <Button
                    onClick={() =>
                      setConfirmObject((prev) => ({
                        ...prev,
                        status: true,
                        text: "Are you really want to Refund?",
                        onAbort: () =>
                          setConfirmObject((prev) => ({
                            ...prev,
                            status: false,
                          })),
                        onConfirm: () => refundRequestHandler(bookingDetails),
                      }))
                    }
                    text={"Request Refund"}
                    disabled={bookingDetails?.booking_status !== "confirmed"}
                  />
                </div>
                <div>
                  <Button
                    onClick={() =>
                      setConfirmObject((prev) => ({
                        ...prev,
                        status: true,
                        text: "Are you really want to Cancel this Booking?",
                        onAbort: () =>
                          setConfirmObject((prev) => ({
                            ...prev,
                            status: false,
                          })),
                        onConfirm: () =>
                          cancelFlightBookingHandler(bookingDetails),
                      }))
                    }
                    text={"Request Cancellation"}
                    disabled={bookingDetails?.booking_status !== "confirmed"}
                  />
                </div>
              </div>
            </div>

            <Button
              disabled={
                bookingDetails?.booking_status === "expired"
                // || now.format("M/D/YYYY h:m:s a") > timeLimit.format("M/D/YYYY h:m:s a")
              }

              className=" py-14 w-full md:w-56 text-xl max-md:mt-6 "
              text={bookingDetails?.booking_status !== "booked"
                // || now.format("M/D/YYYY h:m:s a") > timeLimit.format("M/D/YYYY h:m:s a")
                ? (bookingDetails?.booking_status === "confirmed" ? "Get PNR" : "PNR Expired")
                : "Order Ticket"}

              onClick={() => {
                if (bookingDetails?.booking_status === "confirmed") {
                  handleGetPnr(bookingDetails?.booking_reference_id);
                } else {
                  setConfirmObject((prev) => ({
                    ...prev,
                    status: true,
                    text: `Are you really want to order the ticket. The total fare is ${(bookingDetails?.total_fare).toLocaleString()} `,
                    onAbort: () =>
                      setConfirmObject((prev) => ({ ...prev, status: false })),
                    onConfirm: () =>
                      handleIssue(bookingDetails?.booking_reference_id),
                  }));
                }
              }}
            />
          </CardLayoutBody>
          <CardLayoutBody>
            {bookingDetails?.flightSegments &&
              bookingDetails.flightSegments.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-5 max-sm:flex-wrap text-text"
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
                        "MMM-DD-YYYY, hh:mm"
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
                        "MMM-DD-YYYY, hh:mm"
                      )}
                    </p>
                  </div>
                </div>
              ))}
          </CardLayoutBody>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <div className="flex flex-col md:flex-row justify-between p-4 text-text">
            <div>
              <span className="font-semibold">Booked On: </span>
              {dayjs
                .utc(bookingDetails?.created_at)
                .format("DD MMM YYYY, h:mm a")}
            </div>
            <div>
              <span className="font-semibold">TKT Time Limit: </span>
              {dayjs(bookingDetails?.Timelimit).format("DD MMM YYYY, h:mm a")}
            </div>
          </div>
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader className={"mb-2"} heading="Passenger Details" />

          {bookingDetails && (
            <TableNew
              pagination={false}
              tableData={bookingDetails?.passengers}
              columnsToView={[
                { columnName: "Name", fieldName: "given_name", type: "text" },
                {
                  columnName: "Type",
                  fieldName: "passenger_type_code",
                  type: "text",
                },
                {
                  columnName: "Birth Date",
                  fieldName: "birth_date",
                  type: "date",
                },
                {
                  columnName: "Passport Number",
                  fieldName: "doc_id",
                  type: "text",
                },
                {
                  columnName: "Expiry",
                  fieldName: "expire_date",
                  type: "date",
                },
                {
                  columnName: "Issuance",
                  fieldName: "doc_issue_country",
                  type: "text",
                },
                {
                  columnName: "Nationality",
                  fieldName: "nationality",
                  type: "text",
                },
              ]}
            />
          )}
        </CardLayoutContainer>
        <CardLayoutContainer>
          <CardLayoutHeader
            className={"mb-2"}
            heading={"Pricing Information"}
          />
          {bookingDetails && (
            <TableNew
              pagination={false}
              tableData={bookingDetails?.passengers}
              columnsToView={[
                { columnName: "Name", fieldName: "given_name", type: "text" },
                {
                  columnName: "Type",
                  fieldName: "passenger_type_code",
                  type: "text",
                },
                {
                  columnName: "Birth Date",
                  fieldName: "birth_date",
                  type: "date",
                },
                {
                  columnName: "Passport Number",
                  fieldName: "doc_id",
                  type: "text",
                },
                {
                  columnName: "Expiry",
                  fieldName: "expire_date",
                  type: "date",
                },
                {
                  columnName: "Issuance",
                  fieldName: "doc_issue_country",
                  type: "text",
                },
                {
                  columnName: "Nationality",
                  fieldName: "nationality",
                  type: "text",
                },
              ]}
            />
          )}
          <CardLayoutFooter>
            <h2 className="text-xl font-semibold text-slate-600">
              Total Fare: {Number(bookingDetails?.total_fare).toLocaleString()}
            </h2>
          </CardLayoutFooter>
        </CardLayoutContainer>

        <div className="flex items-center justify-end gap-3">
          <div>
            <Button
              id={"hide-buttons"}
              text="Go Back"
              onClick={() => {
                navigate(-1);
              }}
            />
          </div>
          <div>
            <Button text="View ticket" onClick={downloadHandler} />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
};

export default TicketDetails;
