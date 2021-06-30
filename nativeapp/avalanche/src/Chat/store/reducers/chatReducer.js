import * as actionTypes from '../ActionTypes';

const initialState = {
    chats: [],
    chatMedia: [],
    chatMediaIds: [],
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_CHATS:
            return {
                ...state,
                chats: action.chats,
                error: null,
            }
        case actionTypes.SET_MEDIA:
            return {
                ...state,
                chatMedia: [...state.chatMedia, action.media],
                chatMediaIds: [...state.chatMediaIds, action.mediaId],
            }
        case actionTypes.RESET_MEDIA:
            return {
                ...state,
                chatMedia: [],
                chatMediaIds: [],
            }
        case actionTypes.CHAT_SUCCESS:
            return {
                ...state,
                error: null,
            }
        case actionTypes.CHAT_FAIL:
            return {
                ...state,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;