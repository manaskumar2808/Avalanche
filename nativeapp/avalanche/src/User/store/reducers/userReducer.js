import * as actionTypes from '../ActionTypes';

const initialState = {
    users: [],
    user: null,
    currentUser: null,
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
            }
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
            }
        case actionTypes.RESET_USER_PARAMETERS:
            return {
                ...state,
                currentUser: null,
                user: null,
                users: [],
            }
        case actionTypes.USER_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;