import userReducer from "./userReducer";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userMiddleware from "./middlewares/userMiddleware";
import { reducer as formReducer} from "redux-form";


const reducers = combineReducers({

    users:userReducer,
    form: formReducer
})
export default function configStore() {
  return configureStore({
    reducer: reducers,
    middleware: [userMiddleware],
    preloadedState:loadInitialData()
  });
}

const loadInitialData=()=>
{
  const users=  localStorage.getItem("users") === 'null' || 
   localStorage.getItem("users")==='undefined' ||
   localStorage.getItem("users")===''||
   localStorage.getItem("users")===null|| 
   localStorage.getItem("users")===undefined  ? {entites:{},userIds:[]}
   : JSON.parse(localStorage.getItem("users"));

   return { users};
}