import axios from '../../../../axios-config';
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchReceivedRequests = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('request/received', header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setReceivedRequests(response.data.receivedRequests));
        } catch(error) {
            dispatch(requestFail(error.message));
            throw error;
        }
    }
}

export const fetchSentRequests = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('request/sent', header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setSentRequests(response.data.sentRequests));
        } catch(error) {
            dispatch(requestFail(error.message));
            throw error;
        }
    }
}


export const setReceivedRequests = (requests) => {
    const loadedReceivedRequests = [];
    for(let key in requests) {
        loadedReceivedRequests.push(requests[key]);
    }

    return {
        type: actionTypes.SET_RECEIVED_REQUESTS,
        receivedRequests: loadedReceivedRequests,
    }
}


export const setSentRequests = (requests) => {
    const loadedSentRequests = [];
    for(let key in requests) {
        loadedSentRequests.push(requests[key]);
    }

    return {
        type: actionTypes.SET_SENT_REQUESTS,
        sentRequests: loadedSentRequests,
    }
}


export const sendRequest = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.post('request/add-request/'+userId, {}, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(requestSuccess());
        } catch(error) {
            dispatch(requestFail(error.message));
            throw error;
        }

    }
}

export const acceptRequest = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.patch('request/accept/'+userId, {}, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(requestSuccess());
        } catch(error) {
            dispatch(requestFail(error.message));
            throw error;
        }
    }
}


export const rejectRequest = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.patch('request/reject/'+userId, {}, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(requestSuccess());
        } catch(error) {
            dispatch(requestFail(error.message));
            throw error;
        }
    }
}


export const deleteRequest = (token, requestId) => {
    return async dispatch => {
        try {
            const response = await axios.delete('request/delete/'+requestId, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(requestSuccess());
        } catch(error) {
            dispatch(requestFail(error.message));
            throw error;
        }
    }
}


export const requestSuccess = () => {
    return {
        type: actionTypes.REQUEST_SUCCESS,
    }
}

export const requestFail = (error) => {
    return {
        type: actionTypes.REQUEST_FAIL,
        error: error,
    }
}