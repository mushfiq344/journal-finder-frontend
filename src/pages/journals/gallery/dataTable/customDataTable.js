import React from "react";
import DataTable from "react-data-table-component";

const CustomDataTable = (props) => {
  // populate the table
  const data = props.data;
  // columns
  const columns = props.columns;

  // filtering code
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(
    false
  );
  const filteredItems = props.FilteredItems(data, filterText);

  // search field and button
  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <form className="form-inline theme-form mt-3 billing-form">
        <div className="form-group">
          <input
            id="search"
            className="form-control"
            type="text"
            placeholder="Filter By Name"
            value={filterText}
            onChange={onFilter}
          />

          <button className="btn btn-info" type="button" onClick={onClear}>
            Clear
          </button>
        </div>
      </form>
    </>
  );

  // subHeaderComponentMemo
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    // add new category button
    <div>
      <DataTable
        title={props.tableName}
        columns={columns}
        data={filteredItems}
        pagination
        paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        // fixedHeaderScrollHeight={true}
        persistTableHead
      />
    </div>
  );
};

export { CustomDataTable };
