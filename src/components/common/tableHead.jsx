const TableHead = ({ columns ,sortColumn ,onSetSortColumn,sortrequired}) => {

    const handleSortChanges = (path) => {
        const newSortColumn = { ...sortColumn };
    
        if (newSortColumn.path === path) {
          newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
        } else {
          newSortColumn.path = path;
          newSortColumn.order = "asc";
        }
        onSetSortColumn(newSortColumn);
      };

      const renderSortingIncon=(column)=>
      {
            if(sortrequired) return null;
            if(column.path != sortColumn.path) return null;
            if(sortColumn.order ==='asc')return   <span><i className="fa fa-sort-asc"></i></span>;
            else return <span><i className="fa fa-sort-desc"></i></span>;
      }
      
  return (
    <thead className="thead-light">
      <tr>
        {columns.map((column) => (
          <th onClick={()=>handleSortChanges(column.path)} scope="col" key={column.path || column.key}>
            {column.label}
             {renderSortingIncon(column)}  
          </th>
        ))}
      </tr>
      <tr></tr>
    </thead>
  );
};

export default TableHead;
