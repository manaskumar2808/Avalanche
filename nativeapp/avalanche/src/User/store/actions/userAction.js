import axios from '../../../../axios-config';
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchUsers = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('user/', header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setUsers(response.data.users));
        } catch(error) {
            dispatch(userFail(error.message));
            throw error;
        }
    }
}

export const setUsers = (users) => {
    const loadedUsers = [];
    
    for(let key in users) {
        loadedUsers.push(users[key]);
    }

    return {
        type: actionTypes.SET_USERS,
        users: loadedUsers,
    }
}


export const fetchUser = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('user/'+userId, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error.message);
                throw error;
            }
            dispatch(setUser(response.data.user));
        } catch(error) {
            dispatch(userFail(error.message));
            throw error;
        }
    }
} 

export const setUser = (user) => {
    return {
        type: actionTypes.SET_USER,
        user: user,
    }
}


export const fetchCurrentUser = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('user/current-user', header(token));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setCurrentUser(response.data.currentUser));
        } catch(error) {
            console.log(error.message);
            dispatch(userFail(error.message));
            throw error;
        }
    }
} 

export const setCurrentUser = (user) => {
    return {
        type: actionTypes.SET_CURRENT_USER,
        currentUser: user,
    }
}


export const updateUser = (token, userData) => {
    return async dispatch => {
        try {
            const response = await axios.patch('user/update-user', userData, header(token, true));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(fetchCurrentUser(token));
        } catch(error) {
            dispatch(userFail(error.message));
            throw error;
        }
    }
}


export const resetUserParameters = () => {
    return {
        type: actionTypes.RESET_USER_PARAMETERS,
    }
}

export const userFail = (error) => {
    return {
        type: actionTypes.USER_FAIL,
        error: error,
    }
}