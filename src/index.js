import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import   configStore  from "./store/configStore";

const store = configStore();
ReactDOM.render(
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// import   configStore  from "./store/configStore";
// import { getuserIds } from './store/userReducer';
// import { addUser,removeUser, updateUser } from './store/middlewares/middlewareActions';


// const user = {name:"praveen",gender:"male",email:"smartpraveen@gmail.com",
//               address:"lakshmi nagar",city:"chennai",pincode:"600116",phoneno:"7449162291"};

// const store = configStore();

// store.dispatch(addUser(user)); 
// store.dispatch(addUser(user)); 
// store.dispatch(addUser(user)); 
// store.dispatch(addUser(user)); 
// store.dispatch(addUser(user)); 

// const userIds = getuserIds(store.getState());
// console.log("userIds",userIds);
// store.dispatch(removeUser({id:userIds[0]}));


// const modifyUser = {id:userIds[1],name:"Priyanka",gender:"female",email:"smartpraveen@gmail.com",
//               address:"lakshmi nagar",city:"chennai",pincode:"600116",phoneno:"7449162291"};

// store.dispatch(updateUser(modifyUser));