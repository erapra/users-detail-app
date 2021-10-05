import { Link } from "react-router-dom";
import _ from "lodash";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { sortUser } from "../../store/middlewares/middlewareActions";
import styled from "styled-components";

const TR = styled.tr`
  border-radius: 2px;
  color: ${(props) => (props.isDragging ? "#6a41e7" : "inherit")};
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "inherit")};
`;

const TBODY = styled.tbody`
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    props.isDraggingOver ? "skyblue" : "inherit"};
`;
const renderCell = (column, allItems, itemId) => {
  if (column.content)
    return <td key={itemId}>{column.content(allItems[itemId])}</td>;
  else if (column.path === "name")
    return (
      <td key={`${itemId}${column.path}`}>
        <Link to={`userForm/${itemId}`}>
          {_.get(allItems[itemId], column.path)}
        </Link>
      </td>
    );
  else
    return (
      <td key={`${itemId}${column.path}`}>
        {_.get(allItems[itemId], column.path)}
      </td>
    );
};

const TableBody = ({ columns, allItems, pgItemIds, sortrequired }) => {
  const dispatch = useDispatch();

  const handleDropEnd = ({ draggableId, source, destination }) => {
    if (!destination) return;
    if (source.index === destination.index) return;

    const newitemIds = [...pgItemIds];
    console.log(newitemIds);
    newitemIds.splice(source.index, 1);
    newitemIds.splice(destination.index, 0, draggableId);
    console.log(newitemIds);
    dispatch(sortUser(newitemIds));

    document.body.style.backgroundColor = `inherit`;
  };

  const handleDropUpdate = (update) => {
    const { destination } = update;
    const opacity = destination ? destination.index / pgItemIds.length : 0;
    document.body.style.backgroundColor = `rgba(153,141,217,${opacity})`;
  };

  return (
    <DragDropContext onDragUpdate={handleDropUpdate} onDragEnd={handleDropEnd}>
      <Droppable droppableId="dropitem">
        {(provided, snapshot) => (
          <TBODY
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
            ref={provided.innerRef}
          >
            {pgItemIds.map((itemId, index) => (
              <Draggable
                draggableId={itemId}
                index={index}
                key={itemId}
                isDragDisabled={!sortrequired}
              >
                {(provided, snapshot) => (
                  <TR
                    key={itemId}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    isDragging={snapshot.isDragging}
                  >
                    {columns.map((column) =>
                      renderCell(column, allItems, itemId)
                    )}
                  </TR>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </TBODY>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TableBody;
