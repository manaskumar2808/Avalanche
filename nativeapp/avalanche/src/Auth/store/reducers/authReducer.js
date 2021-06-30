import * as actionTypes from '../ActionTypes';

const initialState = {
    token: null,
    userId: null,
    expiryDate: null,
    error: null,
    authUserName: null,
    authEmail: null,
    authPassword: null,
    authFirstName: null,
    authLastName: null,
    authPhoneNo: null,
    authAge: -1,
    authProfileImage: null,
    authThemeImage: null,
    authThemeIndex: -1,
    authBio: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_USERNAME_AND_EMAIL:
            return {
                ...state,
                authUserName: action.userName,
                authEmail: action.email,
            }
        case actionTypes.SET_PROFILE_INFO:
            return {
                ...state,
                authFirstName: action.firstName,
                authLastName: action.lastName,
                authPhoneNo: action.phoneNo,
                authAge: action.age,
            }
        case actionTypes.SET_PROFILE_IMAGE: 
            return {
                ...state,
                authProfileImage: action.profileImage,
            }
        case actionTypes.SET_THEME_IMAGE:
            return {
                ...state,
                authThemeImage: action.themeImage,
            }
        case actionTypes.SET_THEME_INDEX:
            return {
                ...state,
                authThemeIndex: action.themeIndex,
            }
        case actionTypes.SET_BIO:
            return {
                ...state,
                authBio: action.bio,
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                expiryDate: null,
            }
        case actionTypes.RESET_AUTH_PARAMETERS:
            return {
                ...state,
                authUserName: null,
                authEmail: null,
                authPassword: null,
                authFirstName: null,
                authLastName: null,
                authPhoneNo: null,
                authAge: -1,
                authProfileImage: null,
                authThemeImage: null,
                authThemeIndex: -1,
                authBio: null,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                expiryDate: action.expiryDate,
            }
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                token: null,
                userId: null,
                expiryDate: null,
                error: action.error,
            }
        default: 
            return state;
    }
}

export default reducer;