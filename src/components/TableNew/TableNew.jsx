import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { format } from 'date-fns';
import { TbCheck, TbChevronLeft, TbChevronLeftPipe, TbChevronRight, TbChevronRightPipe } from "react-icons/tb";
import { object } from 'yup';
import dayjs from 'dayjs';
import { CustomTooltip, Spinner } from '../components';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosAirplane } from 'react-icons/io';
// import {Cell}  from "@table-library/react-table-library/table";

const TableNew = ({ columnsToView, tableData, actions, activeIndex }) => {
    // const data = React.useMemo(() => tableData, []);
    const data = tableData;
    const [rowsPerPage, setRowsPerPage] = useState(15);
    const [finalRowsPerPage, setfinalRowsPerPage] = useState(15);
    const [loader, setLoader] = useState(true);
    const [extraRow, setExtraRow] = useState(null);
    const [toggle, setToggle] = useState(false);
    const [maxLength, setmaxLength] = useState(null);

    // console.log('tableData', tableData)
    // console.log('active in/dex', activeIndex)
    // console.log('columns', columnsToView)
    // console.log(extraRow);


    const fieldNames = columnsToView.map(item => item.fieldName)

    useEffect(() => {
        if (toggle) {
            setmaxLength(1000)
        } else {
            setmaxLength(15)
        }

    }, [toggle])
    useEffect(() => {
        setTimeout(() => {
            setLoader(false)
        }, 3000);
    }, [])



    useEffect(() => {
        // it is to get the field names from tableData which are not present in columnsToView an and show them when click on viw button action
        if (activeIndex != null) {

            setExtraRow(Object.entries(tableData[activeIndex])
                .filter(([key]) => !fieldNames.includes(key))) // Compare key with fieldName values

        }
    }, [activeIndex]);


    const columnsView =
        columnsToView
            .filter(item => item.fieldName !== 'origin' && item.fieldName !== 'destination')
            .map((item, i) => {
                if (item.type == 'number') {
                    return {
                        Header: item.columnName,
                        accessor: item.fieldName,
                        Cell: ({ value }) => (
                            <span>
                                <p className={`text-text  text-sm `}>
                                    {Number(value).toLocaleString()}
                                </p>
                            </span>
                        )
                    }
                }
                else if (item.type == 'date') {
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
                                <p className={`text-xs md:text-sm w-40 md:w-44 mx-auto  border-[1px]  tracking-tight px-2 py-1  rounded-lg ${value == 'pending' ? 'text-yellowColor border-yellowColor bg-yellowbg' : value == 'requested-cancellation' || value == 'inactive' ? 'text-redColor border-redColor bg-redbg' : 'text-greenColor bg-greenbg border-greenColor'} font-semibold  capitalize`}>
                                    {value}
                                </p>
                            </span>
                        )
                    }
                }
                if (item.columnName == 'Description') {
                    return {
                        Header: item.columnName,
                        accessor: item.fieldName,
                        Cell: ({ value }) => (
                            <p className={`text-text text-sm flex items-center gap-2 justify-center`}>
                                {value.length > 30 ? `${value.substring(0, 10)}...` : value}
                            </p>
                        )
                    }
                }
                else {
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

    columnsView.unshift({
        Header: "Route",
        Cell: ({ row }) => (
            <span className="text-text text-sm flex items-center gap-2 justify-center">
                {row.original.origin}
                <div className='flex items-center gap-1'>
                    <span className="h-0.5 w-3 bg-primary"></span>
                    <IoIosAirplane className="text-lg text-primary" />
                    <span className="h-0.5 w-3 bg-primary"></span>
                </div>

                {row.original.destination}
            </span>
        )
    });

    const columns = React.useMemo(() => [
        {
            id: 'no',
            Header: "No.",
            accessor: (row, i) => i + 1, // Row index starting from 1
            Cell: ({ row }) => (
                <span className="text-sm text-text">{row.index + 1}</span>
            )
        },
        ...columnsView,
        {
            id: 'pnr',
            Header: "PNR",
            accessor: (row, i) => i + 1, // Row index starting from 1
            Cell: ({ row }) => (
                <span className="text-sm text-text">active</span>
            )
        },
        ...(actions ? [{
            Header: 'Actions',
            id: 'actions',
            Cell: ({ row }) => (
                <span className="text-text text-lg flex gap-2 items-center relative">
                    {actions.map((action, idx) => (
                        <CustomTooltip key={idx} content={action.name}>
                            <div
                                className="cursor-pointer "
                                onClick={() => action.handler(row.index, tableData[row.index])}
                            >
                                <div className=''>
                                    {action.icon}

                                </div>


                            </div>
                        </CustomTooltip>
                    ))}
                    {/* {activeIndex != null & activeIndex === row.index ?
                        <p className='absolute z-10 right-0 text-sm top-6 w-56 bg-white border-gray border-[1px] rounded-lg text-text px-3 py-1 shadow-lg font-semibold'>
                            {tableData[activeIndex].roleRights}
                        </p> : ''} */}
                </span>
            )
        }] : [])
    ], [activeIndex]);

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
    // console.log('headers', headerGroups)
    return (
        <div className="">

            <div className="container mx-auto max-w- overflow-x-auto scrollbar-hide shadow-md">
                <table className="min-w-full bg-white  rounded-lg overflow-hidden " {...getTableProps()}>
                    {columnsToView.length > 0 && <thead className="bg-primary">
                        {headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    // if (column == "Route")
                                    //     return <th
                                    //         colSpan={columns.length - 4}
                                    //         {...column.getHeaderProps()}
                                    //         className="px-7 py-4 text-center  text-sm font-bold text-white uppercase tracking-wider"
                                    //     >
                                    //         {column.render("Header")}
                                    //     </th>
                                    // else

                                    return <th
                                        {...column.getHeaderProps()}
                                        className="px-7 py-4 text-center  text-sm font-bold text-white uppercase tracking-wider"
                                    >
                                        {column.render("Header")}
                                    </th>
                                }
                                )}
                            </tr>
                        ))}
                    </thead>}
                    {tableData.length > 0 ?
                        <tbody {...getTableBodyProps()}>
                            {page.map((row) => {
                                prepareRow(row);
                                return (
                                    <>
                                        <tr {...row.getRowProps()} className="hover:bg-slate-50 transition-colors">
                                            {row.cells.map((cell) => (
                                                <>
                                                    <td
                                                        {...cell.getCellProps()}
                                                        className="px-4 lg:px-6 py-3 text-center text-lg text-text border-t border-slate-100 "
                                                    >
                                                        {cell.render("Cell")}
                                                    </td>

                                                </>
                                            ))}
                                        </tr>
                                        {activeIndex !== null && extraRow != null && activeIndex === row.index ? (
                                            <tr className="h-10 bg-slate-200 w-full transition-colors  text-text ">
                                                <td colSpan={columns.length} className="w-full pl-5 ">
                                                    <button className='border-[1px] border-primary text-primary capitalize bg-bluebg hover:text-secondary px-3 py-1 my-4 rounded-lg cursor-pointer' onClick={() => setToggle((prev) => !prev)}>view Full Info</button>
                                                    {extraRow.length > 1 ?
                                                        extraRow.map((item, i) => (
                                                            <div key={i} className='flex gap-2'>
                                                                <span className='capitalize font-semibold'>
                                                                    {item[0].replaceAll('_', ' ')}:
                                                                </span>
                                                                <span>{
                                                                    item[1] && item[1].length > maxLength ?
                                                                        <span className='flex gap-1 items-end'>
                                                                            {item[1].slice(0, maxLength)}<BsThreeDots />
                                                                        </span> :
                                                                        item[1]}
                                                                </span>
                                                            </div>
                                                        )) :
                                                        <div className='flex gap-2'>
                                                            <span className='capitalize font-semibold'>
                                                                {extraRow[0][0].replaceAll('_', ' ')}:
                                                            </span>
                                                            <span>{
                                                                extraRow && extraRow[0][1].length > maxLength ?
                                                                    <span className='flex gap-1 items-end'>
                                                                        {extraRow[0][1].slice(0, maxLength)}<BsThreeDots />
                                                                    </span>
                                                                    :
                                                                    extraRow[0][1]}
                                                            </span>
                                                        </div>
                                                    }
                                                </td>
                                            </tr>
                                        ) : ''}
                                    </>
                                );
                            })}
                        </tbody> :


                        <tbody>
                            <tr>
                                <td colSpan={columns.length} className="w-full py-5 ">
                                    {loader ?

                                        <Spinner className={'text-primary mx-auto'} />
                                        :
                                        <h2 className='text-text capitalize text-center'>No Data Found</h2>
                                    }
                                </td>
                            </tr>

                        </tbody>


                    }
                </table>
            </div>
            {

            }

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