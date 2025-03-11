import React from "react";
import { Spinner } from "../components";
import DataTable from "react-data-table-component";

const Table = ({
  columnsData,
  tableData,
  pagination,
  paginationTotalRows,
  onChangeRowsPerPage,
  onChangePage,
  noRowsPerPage,
  paginationComponentOptions,
  progressPending,
}) => {
  const columns = [
    {
      name: "Project",
      selector: (row) => row.name,
      sortable: false,
      minwidth: "450px",
    },
    {
      name: "Start Date",
      selector: (row) => row.date,
      sortable: false,
    },
    {
      name: "Est.Completion Date",
      selector: (row) => row.date,
      sortable: false,
      minwidth: "150px",
    },
    {
      name: "Status",
      selector: (row) => (
        // <StatusButton color={row.color} text={row.statusText} />
        <div>Saad</div>
      ),
      sortable: false,
    },
  ];

  const data = [
    {
      id: 1,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 2,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 3,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 4,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 5,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 6,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 7,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
    {
      id: 8,
      name: "Lorem ipsum dolor sit amet ",
      date: "Dec 14, 2021",
      statusText: "In Progress",
      color: "bg-green",
    },
  ];
  return (
    <div className="overflow-x-auto">
      <DataTable
        // columns={columnsData ? columnsData : [""]}
        // data={tableData ? tableData : [""]}
        columns={columns}
        data={data}
        pagination={pagination}
        paginationComponentOptions={paginationComponentOptions}
        paginationTotalRows={paginationTotalRows}
        onChangeRowsPerPage={onChangeRowsPerPage}
        onChangePage={onChangePage}
        noRowsPerPage={noRowsPerPage}
        noDataComponent={
          columnsData || tableData ? (
            <Spinner />
          ) : (
            <div>There are no records to display</div>
          )
        }
        paginationServer
        progressPending={progressPending}
        progressComponent={<Spinner />}
        customStyles={{
          headRow: {
            style: {
              backgroundColor: "#eaf3fd",
              borderRadius: "10px",
              borderBottomWidth: "0px",
            },
          },
          headCells: {
            style: {
              fontFamily: "Poppins",
              color: "#404040",
              fontSize: "13px",
              fontWeight: "bold",
            },
          },
          rows: {
            style: {
              fontSize: "13px",
            },
          },
          rowsBottom: {
            style: {
              borderBottomWidth: "1px",
            },
          },
        }}
      />
    </div>
  );
};

export default Table;
