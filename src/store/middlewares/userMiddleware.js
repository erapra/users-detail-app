import { userAdded, userRemoved, userUpdated ,userSorted} from "../userReducer";
//import uuid from "uuid/dist/v1";
//import UUID from "uuid-int";
import { addUser, updateUser,removeUser, sortUser } from "./middlewareActions";
import nextId from "react-id-generator";
import { setPrefix } from "react-id-generator";
import _ from "lodash";

setPrefix("");
//const generator =UUID(0);
const userMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    next(action);
    let storage = localStorage.getItem("users") === 'null' || 
                  localStorage.getItem("users")==='undefined' ||
                  localStorage.getItem("users")===''||
                  localStorage.getItem("users")===null|| 
                  localStorage.getItem("users")===undefined ? {entites:{},userIds:[]}
                  : JSON.parse(localStorage.getItem("users"));

    if (action.type === addUser.type) {
      const uid = storage.userIds.length === 0 ? nextId() : _.add(parseInt(_.max(storage.userIds)),parseInt(nextId())); 
      const id=String(uid);
      const newUser =  { id, ...action.payload }  ;
      storage.entites = { ...storage.entites, [newUser.id]:{...newUser} };
      if(storage.userIds===undefined)
      storage.userIds=[id];
      else
      storage.userIds=[...storage.userIds,id];
      storeLocaleStorage(storage);
      dispatch(userAdded( newUser));
    } 
    else if (action.type === updateUser.type) {
      const userId = action.payload.id;
      storage.entites[userId] = action.payload;

      storeLocaleStorage(storage);
      dispatch(userUpdated( action.payload));
    } 
    else if (action.type === removeUser.type) {
      delete storage.entites[action.payload.id];
      const index=storage.userIds.indexOf(action.payload.id);
      storage.userIds.splice(index,1);
      storeLocaleStorage(storage);
      dispatch(userRemoved({id:action.payload.id}));
    }
    else if(action.type === sortUser.type)
    {
      storage.userIds=action.payload;
      storeLocaleStorage(storage);
      dispatch(userSorted(action.payload));
    }
  };

const storeLocaleStorage=(storage)=>
{
  localStorage.setItem("users", JSON.stringify(storage));
}

export default userMiddleware;
