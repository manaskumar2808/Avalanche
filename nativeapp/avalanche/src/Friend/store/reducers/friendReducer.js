import * as actionTypes from '../ActionTypes';

const initialState = {
    friends: [],
    requests: [],
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_FRIENDS:
            return {
                ...state,
                friends: action.friends,
            }
        case actionTypes.SET_REQUESTS:
            return {
                ...state,
                requests: action.requests,
            }
        case actionTypes.FRIEND_SUCCESS:
            return {
                ...state,
                error: null
            }
        case actionTypes.FREIND_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;