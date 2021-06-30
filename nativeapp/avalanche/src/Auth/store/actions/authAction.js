import axios from '../../../../axios-config';
import * as actionTypes from '../ActionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

let timer;

export const autoLogin = () => {
    return async dispatch => {
        try {
            const response = await AsyncStorage.getItem('authData');
            const responseData = JSON.parse(response);
            if(responseData && responseData.token && responseData.userId) {
                const currentTime = new Date();
                const expiryTime = new Date(responseData.expiryDate);
                if(currentTime >= expiryTime) {
                    dispatch(logout());
                    return false;
                }

                dispatch(authSuccess(responseData.token, responseData.userId, responseData.expiryDate));
                return true;
            }
        } catch(error) {
            dispatch(authFail("No auth store found!"));
            return false;
        }
    }
}


export const login = (authData) => {
    return async dispatch => {
        try {
            const response = await axios.post('auth/login', authData);
            if(response.data.token && response.data.userId)  
                dispatch(createStore(response.data.token, response.data.userId, response.data.expiryDate));
            else if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            else {
                const error = new Error("Can't login due to some server issues... Please try again later.");
                throw error;
            }
        } catch(error) {
            dispatch(authFail("Cannot login at the moment"));
            throw error;
        }
    }
}


export const signup = (authData) => {
    return async dispatch => {
        try {
            const response = await axios.post('auth/signup', authData, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                }
            });
            if(response.data.token && response.data.userId) 
                dispatch(createStore(response.data.token, response.data.userId, response.data.expiryDate));
            else if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            else {
                const error = new Error("Can't signup due to some server issues... Please try again later.");
                throw error;
            }
        } catch(error) {
            dispatch(authFail("Cannot signup at the moment"));
            throw error;
        }
    }
}


export const setUserNameAndEmail = (userName, email) => {
    return {
        type: actionTypes.SET_USERNAME_AND_EMAIL,
        userName: userName,
        email: email,
    }
}


export const setProfileInfo = (firstName, lastName, phoneNo, age) => {
    return {
        type: actionTypes.SET_PROFILE_INFO,
        firstName: firstName,
        lastName: lastName,
        phoneNo: phoneNo,
        age: age || -1,
    }   
}


export const setProfileImage = (profileImage) => {
    return {
        type: actionTypes.SET_PROFILE_IMAGE,
        profileImage,
    }
}


export const setThemeImage = (themeImage) => {
    return {
        type: actionTypes.SET_THEME_IMAGE,
        themeImage,
    }
}

export const setThemeIndex = (themeIndex) => {
    return {
        type: actionTypes.SET_THEME_INDEX,
        themeIndex,
    }
}


export const setBio = (bio) => {
    return {
        type: actionTypes.SET_BIO,
        bio,
    }
}


const clearLogoutTimer = () => {
    if(timer) {
        clearTimeout(timer);
    }
}

const setLogoutTimer = (token, userId, expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logout());
        }, expirationTime);

        dispatch(authSuccess(token, userId, expirationTime));
    }
}


export const logout = () => {
    if(timer) {
        clearLogoutTimer();
    }
    AsyncStorage.removeItem('authData');
    return {
        type: actionTypes.AUTH_LOGOUT,
    }
}


export const createStore = (token, userId, expiryDate) => {
    const expirationTime = new Date(expiryDate);

    return async dispatch => {
        const authData = {
            token: token,
            userId: userId,
            expiryDate: expirationTime,
        }
        try {
            await AsyncStorage.setItem('authData', JSON.stringify(authData));
            dispatch(authSuccess(token, userId, expirationTime));
        } catch(error) {
            dispatch(authFail("Cannot create auth store!"));
            throw error;
        }
    }
}

export const resetAuthParameters = () => {
    return {
        type: actionTypes.RESET_AUTH_PARAMETERS,
    }
}


export const authSuccess = (token, userId, expiryDate) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId,
        expiryDate,
    }
}


export const authFail = (errorMessage) => {
    return {    
        type: actionTypes.AUTH_FAIL,
        error: errorMessage,
    }
}
