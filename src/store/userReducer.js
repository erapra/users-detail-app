import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "users",
  initialState: {entites:{},userIds:[]},
  reducers: {
    userAdded: (state, action) => {     
      state.entites = { ...state.entites,[action.payload.id]:{...action.payload}  };
      console.log(action.payload.id);
      state.userIds.push(action.payload.id);
      return state;
    },
    userUpdated: (state, action) => {
      const userID = action.payload.id;
      state.entites[userID] = action.payload;
      return state;
    },
    userRemoved: (state, action) => {
      delete state.entites[action.payload.id];
      const index =state.userIds.indexOf(action.payload.id);
      state.userIds.splice(index,1);
      return state;
    },
    userSorted:(state,action)=>{
      state.userIds=action.payload;
      return state;
    }
  } 
});

const userReducer = slice.reducer;

export default userReducer;
export const { userAdded, userUpdated, userRemoved ,userSorted} = slice.actions;

//selectors



const getUsersList = (entites) => {
  const usersList = Object.values(entites);
  return usersList;
};

export const selectUserIds = (state) =>state.users.userIds;
export const getUsers = (state) => state.users.entites;
export const selectUsersList = createSelector(getUsers, getUsersList);
export const selectUserById=(userId)=>createSelector(getUsers, (entites) =>  entites[userId] );

//createSelector(getUsers,getUserById);
