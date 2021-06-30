import axios from '../../../../axios-config';
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchFriends = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('friend/friends', header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setFriends(response.data.friends));
        } catch(error) {
            dispatch(friendFail(error.message));
            throw error;
        }
    }
}

export const fetchRequests = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('friend/requests', header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setRequests(response.data.requests));
        } catch(error) {
            dispatch(friendFail(error.message));
            throw error;
        }
    }
}

export const setFriends = (friends) => {
    const loadedFriends = [];
    for(let key in friends) {
        loadedFriends.push(friends[key]);
    }

    return {
        type: actionTypes.SET_FRIENDS,
        friends: loadedFriends,
    }
}

export const setRequests = (requests) => {
    const loadedRequests = [];
    for(let key in requests) {
        loadedRequests.push(requests[key]);
    }

    return {
        type: actionTypes.SET_REQUESTS,
        requests: loadedRequests,
    }
}

export const friend = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.post('friend/friend/'+userId, {}, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(friendSuccess());
        } catch(error) {
            dispatch(friendFail(error.message));
            throw error;
        }
    }
}

export const unfriend = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.delete('friend/unfriend/'+userId, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(friendSuccess());
        } catch(error) {
            dispatch(friendFail(error.message));
            throw error;
        }
    }
}


export const accept = (token, friendId) => {
    return async dispatch => {
        try {
            const response = await axios.post('friend/accept/'+friendId, {}, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(friendSuccess());
        } catch(error) {
            dispatch(friendFail(error.message));
            throw error;
        }
    }
} 

export const reject = (token, friendId) => {
    return async dispatch => {
        try {
            const response = await axios.post('friend/reject/'+friendId, {}, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(friendSuccess());
        } catch(error) {
            dispatch(friendFail(error.message));
            throw error;
        }
    }
} 



export const friendSuccess = () => {
    return {
        type: actionTypes.FRIEND_SUCCESS,
    }
}

export const friendFail = (error) => {
    return {
        type: actionTypes.FREIND_FAIL,
        error: error,
    }
}