import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { format } from 'date-fns';
import { TbCheck, TbChevronLeft, TbChevronLeftPipe, TbChevronRight, TbChevronRightPipe } from "react-icons/tb";
import { object } from 'yup';
import dayjs from 'dayjs';

const TableNew = ({ columnsToView, tableData, actions }) => {
    const data = React.useMemo(() => tableData, []);
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [finalRowsPerPage, setfinalRowsPerPage] = useState(15);

    const columnsView =
        columnsToView.map((item, i) => {
            if (item.type == 'date') {
                return {
                    Header: item.columnName,
                    accessor: item.fieldName,
                    Cell: ({ value }) => (
                        <span>
                            <p className={`text-text  text-sm `}>
                                {dayjs(value).format('MMM-DD-YYYY')}
                            </p>
                        </span>
                    )
                }
            }
            if (item.columnName == 'Status') {
                return {
                    Header: item.columnName,
                    accessor: item.fieldName,
                    Cell: ({ value }) => (
                        <span>
                            <p className={`text-xs md:text-sm w-40 md:w-44 mx-auto  border-[1px]  tracking-tight px-2 py-1  rounded-lg ${value == 'pending' ? 'text-yellowColor border-yellowColor bg-yellowbg' : value == 'requested-cancellation' ? 'text-redColor border-redColor bg-redbg' : 'text-greenColor bg-greenbg border-greenColor'} font-semibold  capitalize`}>
                                {value}
                            </p>
                        </span>
                    )
                }
            } else {
                return {
                    Header: item.columnName,
                    accessor: item.fieldName,
                    Cell: ({ value }) => (
                        <span className="text-text  text-sm">
                            {value}
                        </span>
                    )
                }
            }


        }
        )



    const columns = React.useMemo(() => [
        {
            Header: "No.",
            accessor: (row, i) => i + 1, // Row index starting from 1
            Cell: ({ row }) => (
                <span className="text-sm text-text">{row.index + 1}</span>
            )
        },
        ...columnsView,
        ...(actions ? [{
            Header: 'Actions',
            id: 'actions',
            Cell: ({ row }) => (
                <span className="text-text text-lg flex gap-2 items-center">
                    {actions.map((action, idx) => (
                        <div
                            className="cursor-pointer"
                            key={idx}
                            title={action.name}
                            onClick={() => action.handler(tableData[row.index])}
                        >
                            {action.icon}
                        </div>
                    ))}
                </span>
            )
        }] : [])
    ], []);


    // [
    //     {
    //         Header: "No.",
    //         accessor: (row, i) => i + 1, // Row index starting from 1
    //         Cell: ({ row }) => (
    //             <span className="text-sm text-text">{row.index + 1}</span>
    //         )
    //     },
    //     {
    //         Header: "Booking ID",
    //         accessor: "booking_reference_id",
    //         Cell: ({ value }) => (
    //             <span className="text-primary font-semibold text-sm">
    //                 {value}
    //             </span>
    //         )
    //     },
    //     {
    //         Header: "Origin",
    //         accessor: "origin",
    //         Cell: ({ value }) => (
    //             <span className='text-xs text-text'>
    //                 {value}
    //             </span>
    //         )
    //     },
    //     {
    //         Header: "Destination",
    //         accessor: "destination",
    //         Cell: ({ value }) => (
    //             <span className='text-xs text-text'>
    //                 {value}
    //             </span>
    //         )
    //     },
    //     {
    //         Header: "Status",
    //         accessor: "booking_status",
    //         Cell: ({ value }) => (
    //             <span className={`text-sm   border-[1px]  tracking-tight the rows value should be center align with heading  px-2 py-1  rounded-lg ${value == 'pending' ? 'text-yellowColor border-yellowColor bg-yellowbg' : 'text-greenColor bg-greenbg border-greenColor'} font-semibold  capitalize`}>
    //                 {value}
    //             </span>
    //         )
    //     },
    //     {
    //         Header: "Fare",
    //         accessor: "total_fare",
    //         Cell: ({ value }) => (
    //             <span className='text-sm font-semibold text-text'>
    //                 {value}
    //             </span>
    //         )
    //     },
    //     {
    //         Header: "Created At",
    //         accessor: "created_at",
    //         Cell: ({ value }) => {
    //             const formattedDate = format(new Date(value), 'dd-MMM-yyyy');
    //             return (
    //                 <span className='text-sm text-text'>
    //                     {formattedDate}
    //                 </span>
    //             );
    //         }
    //     },
    //     {
    //         Header: "Rate",
    //         accessor: "rate",
    //         Cell: ({ value }) => (
    //             <span className='text-xs text-text'>
    //                 {value}
    //             </span>
    //         )
    //     },
    //     {
    //         Header: 'Currency',
    //         accessor: 'currency',
    //         Cell: ({ value }) => (
    //             <span className='text-xs text-text'>
    //                 {value}
    //             </span>
    //         )
    //     }
    // ]


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
        setPageSize
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize: finalRowsPerPage }
        },
        usePagination
    );
    useEffect(() => {
        setPageSize(Number(finalRowsPerPage)); // Ensure it's a number
    }, [finalRowsPerPage, setPageSize]);

    return (
        <div className="">
            <div className="text-2xl flex items-center justify-center text-text font-semibold italic  mb-4">
                {/* <h1>Customer Data Table</h1> */}
            </div>
            <div className="container mx-auto max-w- overflow-x-auto scrollbar-hide shadow-md">
                <table className="min-w-full bg-white  rounded-lg overflow-hidden " {...getTableProps()}>
                    <thead className="bg-primary">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th
                                        {...column.getHeaderProps()}
                                        className="px-7 py-4 text-center  text-sm font-bold text-white uppercase tracking-wider"
                                    >
                                        {column.render("Header")}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()} className="hover:bg-slate-50 transition-colors">
                                    {row.cells.map((cell) => (
                                        <td
                                            {...cell.getCellProps()}
                                            className="px-4 lg:px-6 py-3 text-center text-lg text-text border-t border-slate-100 "
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Paginaion  */}
            <div className="flex flex-wrap items-center justify-end gap-2 my-4 mx-6">
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text">Rows per page:</span>
                    <input
                        type="number" value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}
                        className="w-12 border  h-8 flex items-center justify-center rounded-md text-sm text-text text-center border-gray  focus:border-primary focus:outline-none"
                    />{
                        rowsPerPage !== finalRowsPerPage &&
                        <TbCheck className='text-primary' onClick={() => setfinalRowsPerPage(rowsPerPage)} />
                    }
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-text">
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                    </span>
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className="px-3 py-1 cursor-pointer rounded-md text-sm font-semibold text-text bg-white hover:bg-slate-50 border-[1px] border-gray disabled:opacity-50 hover:text-primary disabled:hover:text-text focus:outline-none focus:border-primary"
                    >
                        {<TbChevronLeftPipe size={20} />}
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="px-3 py-1 cursor-pointer rounded-md text-sm font-semibold text-text bg-white hover:bg-slate-50 border-[1px] border-gray disabled:opacity-50 hover:text-primary disabled:hover:text-text focus:outline-none focus:border-primary"
                    >
                        {<TbChevronLeft size={20} />}
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="px-3 py-1 cursor-pointer rounded-md text-sm font-semibold text-text bg-white hover:bg-slate-50 border-[1px] border-gray disabled:opacity-50 hover:text-primary disabled:hover:text-text focus:outline-none focus:border-primary"
                    >
                        {<TbChevronRight size={20} />}
                    </button>
                    <button
                        onClick={() => gotoPage(pageCount - 1)}
                        disabled={!canNextPage}
                        className="px-2 py-1 cursor-pointer rounded-md text-sm font-semibold text-text bg-white hover:bg-slate-50 border-[1px] border-gray disabled:opacity-50 hover:text-primary disabled:hover:text-text focus:outline-none focus:border-primary"
                    >
                        {<TbChevronRightPipe size={20} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TableNew;