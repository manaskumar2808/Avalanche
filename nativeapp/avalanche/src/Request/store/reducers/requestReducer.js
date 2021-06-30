import * as actionTypes from '../ActionTypes';

const initialState = {
    receivedRequests: [],
    sentRequests: [],
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_RECEIVED_REQUESTS:
            return {
                ...state,
                receivedRequests: action.receivedRequests,
            }
        case actionTypes.SET_SENT_REQUESTS:
            return {
                ...state,
                sentRequests: action.sentRequests,
            }
        case actionTypes.REQUEST_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.REQUEST_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;