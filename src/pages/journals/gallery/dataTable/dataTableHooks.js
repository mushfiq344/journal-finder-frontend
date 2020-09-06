import React, { useState } from "react";
import { CustomDataTable } from "./customDataTable";
import { Link } from 'react-router-dom'
function DataTableHooks(props) {
  // rows
  const [rows, setRows] = useState(props.data);

  // delete row
  const deleteRow = async (id) => {
    await setRows(rows.filter((row) => row.id != id));
    props.deleteRowFromDb(id);
  };

  // custom columns
  const ActionColumn = ({ row }) => (
    <React.Fragment>
      <Link to={`${props.viewPath}${row.id}`}
        className="btn btn-success btn-sm mr-4"
      >
        <i className="fa fa-pencil"></i> View
      </Link>
      {/* <button
        onClick={() => deleteRow(row.id)}
        className="btn btn-danger btn-sm"
      >
        <i className="fa fa-trash-o"></i> Delete
      </button> */}
    </React.Fragment>
  );

  // custom column
  const customColumn = {
    name: "Action",
    sortable: true,
    cell: (row) => <ActionColumn row={row} />,
  };

  //columns
  const columns = [];
  columns.push(...props.columns);
  columns.push(customColumn);

  // filter options
  // add more options at your please
  const FilteredItems = (data, filterText) => {
    const filteredItems = data.filter(
      (item) =>
        (item.title &&
          item.title.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.id &&
          item.id
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase())) ||
        (item.categories &&
          item.categories.toString().toLowerCase().includes(filterText.toLowerCase()))
    );
    return filteredItems;
  };
  console.log("rows at hooks", rows)
  return (
    <div>
      <CustomDataTable
        tableName={props.tableName}
        data={props.data}
        deleteRow={deleteRow}
        columns={columns}
        FilteredItems={FilteredItems}
      />
    </div>
  );
}

export { DataTableHooks };
