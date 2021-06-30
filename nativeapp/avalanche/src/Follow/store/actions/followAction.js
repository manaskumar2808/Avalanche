import axios from '../../../../axios-config'; 
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchFollowers = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('follow/followers/'+userId, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setFollowers(response.data.followers));
        } catch(error) {
            dispatch(followFail(error.message));
            throw error;
        }
    }
}

export const setFollowers = (followers) => {
    const loadedFollowers = [];
    for(let key in followers) {
        loadedFollowers.push(followers[key]);
    }

    return {
        type: actionTypes.SET_FOLLOWERS,
        followers: loadedFollowers,
    }
}

export const fetchFolloweds = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('follow/followeds/'+userId, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setFolloweds(response.data.followeds));
        } catch(error) {
            dispatch(followFail(error.message));
            throw error;
        }
    }
}

export const setFolloweds = (followeds) => {
    const loadedFolloweds = [];
    for(let key in followeds) {
        loadedFolloweds.push(followeds[key]);
    }

    return {
        type: actionTypes.SET_FOLLOWEDS,
        followeds: loadedFolloweds,
    }
}


export const follow = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.post('follow/follow/'+userId,{}, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(followSuccess());
        } catch(error) {
            dispatch(followFail(error.message));
            throw error;
        }
    }
}

export const unfollow = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.delete('follow/unfollow/'+userId, header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(followSuccess());
        } catch(error) {
            dispatch(followFail(error.message));
            throw error;
        }
    }
}

export const followSuccess = () => {
    return {
        type: actionTypes.FOLLOW_SUCCESS,
    }
}

export const followFail = (error) => {
    return {
        type: actionTypes.FOLLOW_FAIL,
        error: error,
    }
}