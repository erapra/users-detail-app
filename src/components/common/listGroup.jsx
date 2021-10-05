const ListGroup = ({
  lists,
  onSelectGender,
  selectedGender,
  textProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group">
      {lists.map((list) => (
        <li
          key={list[valueProperty]}
          className={
            list[textProperty] === selectedGender[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onSelectGender(list)}
        >
          {list[textProperty]}
        </li>
      ))}
     
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "id",
};

export default ListGroup;
