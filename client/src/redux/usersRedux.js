export const getUser = ({ user }) => user;

const createActionName = (actionName) => `app/users/${actionName}`;
const LOG_IN = createActionName('LOG_IN');

export const logIn = payload => ({
  type: LOG_IN,
  payload
})

const usersReducer = (statPart = null, action) => {
  switch (action.type){
    case LOG_IN:
      return action.payload;
    default:
      return statPart;
  }
};

export default usersReducer;