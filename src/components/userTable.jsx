import { useEffect, useState } from "react";
import TableHead from "./common/tableHead";
import TableBody from "./common/tableBody";
import paginate from "./../utils/paginate";
import _ from "lodash";
import { removeUser } from "../store/middlewares/middlewareActions";
import { useDispatch } from "react-redux";

const UserTable = (props) => {
  const {allUsers, filteredUserIds, currentPage, displayCount,sortrequired } = props;
  const dispatch = useDispatch();
  const [sortColumn, setSortColumn] = useState({ path: "name", order: "asc" });
  const [columns] = useState([
    { path: "name", label: "Name" },
    { path: "gender", label: "Gender" },
    { path: "email", label: "Email" },
    {
      key: "delete",
      content: (user) => (
        <button
          className="btn btn-danger"
          onClick={() => dispatch(removeUser({ id: user.id }))}
        >
          Remove
        </button>
      ),
    },
  ]);
  let sortedUser=[];
  if(!sortrequired)
  {
     sortedUser = _.orderBy(
      filteredUserIds.map(userId=>(allUsers[userId])),
      [sortColumn.path],
      [sortColumn.order]
    ).map(user=>user.id);
  }
  else
  {
    sortedUser=filteredUserIds;
  }
  const pgUserIds = paginate(sortedUser, currentPage, displayCount);
 
  return (
    <table className="table table-hover">
      <TableHead columns={columns} sortColumn={sortColumn} onSetSortColumn={setSortColumn} sortrequired={sortrequired}/>
      <TableBody columns={columns}  allItems={allUsers} pgItemIds={pgUserIds} sortrequired={sortrequired}/>
    </table>
  );
};

export default UserTable;
