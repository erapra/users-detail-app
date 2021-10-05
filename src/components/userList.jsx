import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUsersList } from "../store/userReducer";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import styled from "styled-components";
import UserTable from "./userTable";
import { getUsers, selectUserIds } from "./../store/userReducer";
import CustomizedTable from "./common/customedTable";
const Container = styled.div`
  margin: 20px;
`;
// Functional component
const UserList = (props) => {
  const userList = useSelector(selectUsersList);
  const allUsers = useSelector(getUsers);
  const userIds = useSelector(selectUserIds);
  const [currentPage, setCurrentPage] = useState(1);
  const [displayCount, setDisplayCount] = useState(4);
  const [sortrequired, setSortrequired] = useState(false);
  const [genderList] = useState([
    { name: "All Gender", id: " " },
    { name: "Male", id: "male" },
    { name: "FeMale", id: "female" },
  ]);
  const [selectedGender, setSelectedGender] = useState({});
  const [queryString, setQueryString] = useState("");
  useEffect(() => {
    setSelectedGender(genderList[0]);
  }, [userList]);

  const handlePageChanges = (page) => {
    setCurrentPage(page);
  };

  const handleSelectGender = (gender) => {
    setSelectedGender({ ...gender });
    setCurrentPage(1);
    setDisplayCount(4);
    setQueryString("");
    setSortrequired(false);
  };
  const handleChanges = (value) => {
    setSelectedGender(genderList[0]);
    setCurrentPage(1);
    setDisplayCount(4);
    setQueryString(value);
    setSortrequired(false);
  };

  const handleSortRequired = (e) => {
    setSortrequired(e.target.checked);
    if (e.target.checked) {
      setDisplayCount(userList.length);
      setCurrentPage(1);
    } else setDisplayCount(4);
  };

  // if (userCount === 0) return null;

  let filteredUserIds = [];
  if (!sortrequired) {
    if (queryString.trim() !== "") {
      filteredUserIds = userList
        .filter(
          (user) =>
            user.name.toLowerCase().startsWith(queryString.toLowerCase()) ||
            user.gender.toLowerCase().startsWith(queryString.toLowerCase()) ||
            user.email.toLowerCase().startsWith(queryString.toLowerCase())
        )
        .map((user) => user.id);
    } else if (selectedGender && selectedGender.id !== " ") {
      filteredUserIds = userList
        .filter((user) => user.gender === selectedGender.id)
        .map((user) => user.id);
    } else {
      filteredUserIds = [...userIds];
    }
  } else {
    filteredUserIds = [...userIds];
  }
  return (
    <React.Fragment>
      <Container>
        <div className="row">
          <div
            className="col-md-3  "
            style={{ border: sortrequired ? "inherit" : "solid #f8f9fa" }}
          >
            <ListGroup
              lists={genderList}
              onSelectGender={handleSelectGender}
              selectedGender={selectedGender}
            />
          </div>
          <div
            className="col-md-9"
            style={{ border: sortrequired ? "inherit" : "solid #f8f9fa" }}
          >
            <CustomizedTable
              filteredUserIds={filteredUserIds}
              sortrequired={sortrequired}
              onSortRequired={handleSortRequired}
              queryString={queryString}
              onChanges={handleChanges}
              onAddUser={handleAddUser}
              history={props.history}
            />

            <UserTable
              allUsers={allUsers}
              filteredUserIds={filteredUserIds}
              currentPage={currentPage}
              displayCount={displayCount}
              sortrequired={sortrequired}
            />

            <Pagination
              userCount={filteredUserIds.length}
              displayCount={displayCount}
              currentPage={currentPage}
              onPageChanges={handlePageChanges}
            />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

const handleAddUser = (e, history) => {
  e.preventDefault();
  history.push("/userForm");
};

export default UserList;
