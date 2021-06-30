import * as actionTypes from '../ActionTypes';

const initialState = {
    followers: [],
    followeds: [],
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_FOLLOWERS:
            return {
                ...state,
                followers: action.followers,
            }
        case actionTypes.SET_FOLLOWEDS:
            return {
                ...state,
                followeds: action.followeds,
            }
        
        case actionTypes.FOLLOW_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.FOLLOW_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;