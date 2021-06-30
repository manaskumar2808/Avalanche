import axios from '../../../../axios-config';
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchChats = (token, roomId) => {
    return async dispatch => {
        try {
            const response = await axios.get('chat/'+roomId, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(setChats(response.data.chats));
        } catch(error) {
            dispatch(chatFail(error.message));
            throw error;
        }
    }
}


export const setChats = (chats) => {
    const loadedChats = [];
    for(let key in chats) {
        loadedChats.push(chats[key]);
    }
    return {
        type: actionTypes.SET_CHATS,
        chats: loadedChats,
    }
}  

export const addMedia = (token, galleryItem) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('type', galleryItem.type);
        formData.append('parent', galleryItem.parent);
        formData.append('image', galleryItem.image);
        formData.append('video', galleryItem.video);
        try {
            const response = await axios.post('gallery/add', formData, header(token, true));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.added) {
                dispatch(setMedia(galleryItem, response.data.galleryItem.id));
            }
            else {
                const errorMessage = "Server is facing some issue while adding the gallery item! please try again later";
                const error = new Error(errorMessage);
                throw error;
            } 
        } catch(error) {
            console.log('error : ',error);
            dispatch(feedError(error.message));
            throw error;
        }   
    }
}

export const setMedia = (media, mediaId) => {
    return {
        type: actionTypes.SET_MEDIA,
        media,
        mediaId,
    }
}


export const resetMedia = () => {
    return {
        type: actionTypes.RESET_MEDIA,
    }
}


export const addChat = (token, chatData) => {
    return async dispatch => {
        try {
            const response = await axios.post('chat/add', chatData, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            dispatch(chatSuccess());
        } catch(error) {
            dispatch(chatFail(error.message));
            throw error;
        }
    }
}

export const chatSuccess = () => {
    return {
        type: actionTypes.CHAT_SUCCESS,
    }
}

export const chatFail = (error) => {
    return {
        type: actionTypes.CHAT_FAIL,
        error: error,
    }
}