import React, { useEffect } from "react";
import { useState } from "react";
import { useTable, usePagination } from "react-table";
import {
  TbCheck,
  TbChevronLeft,
  TbChevronLeftPipe,
  TbChevronRight,
  TbChevronRightPipe,
} from "react-icons/tb";
import dayjs from "dayjs";
import { CustomTooltip, Spinner, Tag } from "../components";
import { IoIosAirplane } from "react-icons/io";
import toast, { Toaster } from "react-hot-toast";

const TableNew = ({
  columnsToView,
  tableData,
  actions,
  activeIndex,
  pagination = true,
  loader,
}) => {
  useEffect(() => {
    console.log(tableData, "tableData");
  }, [tableData]);
  const data = tableData;
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [finalRowsPerPage, setfinalRowsPerPage] = useState(15);

  const formatCell = (type, value) => {
    if (type === "number") return Number(value).toLocaleString();
    if (type === "date") return dayjs(value).format("MMM-DD-YYYY");
    if (type === "text")
      return value?.length > 15 ? `${value.slice(0, 15)}...` : value;
    return value;
  };

  const columnsView = columnsToView
    .filter(
      ({ fieldName }) => fieldName !== "origin" && fieldName !== "destination"
    )
    .map(({ columnName, fieldName, type }, i) => ({
      Header: columnName,
      accessor: fieldName,
      Cell: ({ value }) => (
        <p key={i} className="text-sm text-text">
          {formatCell(type, value)}
        </p>
      ),
    }));

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        id: "no",
        Header: "No.",
        accessor: (_row, i) => i + 1,
        Cell: ({ row, i }) => (
          <span key={i} className="w-12 text-sm text-text">
            {row.index + 1}
          </span>
        ),
      },
    ];
    if (tableData.some(({ origin, destination }) => origin || destination)) {
      baseColumns.push({
        Header: "Route",
        Cell: ({ row: { original } }) => (
          <span className="flex items-center justify-center gap-2 text-sm text-text">
            {original.origin}
            <div className="flex items-center gap-1">
              <span className="h-0.5 w-3 bg-primary"></span>
              <IoIosAirplane className="text-lg text-primary" />
              <span className="h-0.5 w-3 bg-primary"></span>
            </div>
            {original.destination}
          </span>
        ),
      });
    }
    const actionColumn = actions?.length
      ? {
          Header: "Actions",
          Cell: ({ row: { original, index } }) => (
            <span className="relative flex items-center justify-center gap-2 text-lg text-text">
              {actions.map(({ name, handler, icon }, idx) => (
                <CustomTooltip key={idx} content={name}>
                  <div
                    className="cursor-pointer"
                    onClick={() => handler(index, original)}>
                    {icon}
                  </div>
                </CustomTooltip>
              ))}
            </span>
          ),
        }
      : null;

    return [
      ...baseColumns,
      ...columnsView,
      ...(actionColumn ? [actionColumn] : []),
    ];
  }, [activeIndex, tableData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,

    prepareRow,
    state: { pageIndex },
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: finalRowsPerPage },
    },
    usePagination
  );
  useEffect(() => {
    if (finalRowsPerPage > 0) {
      setPageSize(Number(finalRowsPerPage));
    } else {
      toast.error("Wrong Page Size");
    }
  }, [finalRowsPerPage, setPageSize]);
  return (
    <div className="">
      <Toaster />
      <div className="container mx-auto overflow-x-auto shadow-md max-w- scrollbar-hide">
        <table
          className="min-w-full overflow-hidden bg-white rounded-lg "
          {...getTableProps()}>
          {columnsToView.length > 0 && (
            <thead className="bg-primary">
              {headerGroups.map((headerGroup, index) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, idx) => {
                    return (
                      <th
                        {...column.getHeaderProps()}
                        key={idx}
                        className="px-4 py-5 mx-5 text-sm font-bold tracking-wider text-center text-white uppercase">
                        {column.render("Header")}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
          )}
          {loader ? (
            <tr>
              <td colSpan={columns.length} className="w-full py-5">
                <Spinner className="mx-auto text-primary" />
              </td>
            </tr>
          ) : tableData.length > 0 ? (
            <tbody {...getTableBodyProps()}>
              {page.map((row, key) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={key + 1}
                    className="transition-colors hover:bg-slate-50">
                    {row.cells.map((cell, i) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-5 text-lg text-center border-t min-w-32 lg:px-6 text-text border-slate-100 "
                        key={i}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tr>
              <td colSpan={columns.length} className="w-full py-5">
                <h2 className="text-center capitalize text-text">
                  No Data Found
                </h2>
              </td>
            </tr>
          )}
        </table>
      </div>
      {pagination && (
        <div className="flex flex-wrap items-center justify-end gap-2 mx-6 my-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text">Rows per page:</span>
            <input
              type="number"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(e.target.value)}
              className="w-12 h-8 text-sm text-center border rounded-md text-text border-gray focus:border-primary focus:outline-none"
            />
            {rowsPerPage !== finalRowsPerPage && rowsPerPage !== 0 && (
              <TbCheck
                className="cursor-pointer text-primary"
                onClick={() => setfinalRowsPerPage(rowsPerPage)}
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text">
              Page{" "}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>
            </span>
            {[
              {
                icon: <TbChevronLeftPipe size={20} />,
                onClick: () => gotoPage(0),
                disabled: !canPreviousPage,
              },
              {
                icon: <TbChevronLeft size={20} />,
                onClick: previousPage,
                disabled: !canPreviousPage,
              },
              {
                icon: <TbChevronRight size={20} />,
                onClick: nextPage,
                disabled: !canNextPage,
              },
              {
                icon: <TbChevronRightPipe size={20} />,
                onClick: () => gotoPage(pageCount - 1),
                disabled: !canNextPage,
              },
            ].map(({ icon, onClick, disabled }, idx) => (
              <button
                key={idx}
                onClick={onClick}
                disabled={disabled}
                className="px-3 py-1 text-sm font-semibold bg-white border rounded-md text-text hover:bg-slate-50 border-gray disabled:opacity-50 hover:text-primary focus:outline-none focus:border-primary">
                {icon}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableNew;

// hook.js:608 Warning: validateDOMNesting(...): <tr> cannot appear as a child of <table>. Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser. Error Component Stack
//     at tr (<anonymous>)
//     at table (<anonymous>)
//     at div (<anonymous>)
//     at div (<anonymous>)
//     at TableNew (TableNew.jsx:17:3)
//     at div (<anonymous>)
//     at CardLayoutBody (CardLayout.jsx:23:34)
//     at div (<anonymous>)
//     at div (<anonymous>)
//     at CardLayoutContainer (CardLayout.jsx:43:3)
//     at div (<anonymous>)
//     at DashboardHome (DashboardHome.jsx:28:20)
//     at Layout (layout.jsx:7:45)
//     at Dashboard (<anonymous>)
//     at AppRoutes (routes.jsx:7:20)
//     at AuthProvider (AuthContext.jsx:8:25)
//     at Main (<anonymous>)
