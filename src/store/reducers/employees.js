import * as at from "../actions/actionTypes";

// REDUCER;
const allEmployees = (state = [], action) => {
  switch (action.type) {
    case at.FETCH_ALL_EMPLOYEES:
      return action.payload;
    case at.ADD_EMPLOYEE:
      return [...state, action.payload]
      return state;
    case at.EDIT_EMPLOYEE:
      return state.map(employee=> {
        return(
          employee.id===action.payload.id ? action.payload : employee
        );
      });
      default:
        return state;
  }
};

export default allEmployees;