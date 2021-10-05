import SearchBox from './searchBox';

const CustomizedTable = (props) => {
    const{filteredUserIds,sortrequired,onSortRequired,queryString,onChanges,onAddUser,history}=props;
    return ( <div className="row">
    <div className="col-md-5">
      {filteredUserIds.length === 0 ? (
        "No user Available in the List "
      ) : (
        <p>Showing {filteredUserIds.length} users from the list</p>
      )}
    </div>
    <div className="col-md-3">
      <input
        name="sortCheck"
        type="checkbox"
        checked={sortrequired}
        onChange={onSortRequired}
      />
      <label htmlFor="sortCheck">&nbsp;&nbsp;Sortable</label>
    </div>
    <div className="col-md-3">
      <SearchBox value={queryString} onChange={onChanges} />
    </div>
    <div className="col-md-1">
      <button
        className="btn btn-primary"
        onClick={(e) => onAddUser(e, history)}
      >
        New
      </button>
    </div>
  </div> );
}
 
export default CustomizedTable;