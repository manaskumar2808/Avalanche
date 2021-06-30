import axios from '../../../../axios-config';
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchFeeds = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('feed/', header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.received) {
                dispatch(setFeeds(response.data.feeds));
            } else {
                const error = new Error(response.data.error);
                throw error;
            } 
        } catch(error) {
            dispatch(feedError(error.message));
            throw error;
        }
    }
}


export const setFeeds = (feeds) => {
    const loadedFeeds = [];
    for(let key in feeds) {
        loadedFeeds.push(feeds[key]);
    }

    return {
        type: actionTypes.SET_FEEDS,
        feeds: loadedFeeds,
    }
}


export const fetchFeed = (token, feedId) => {
    return async dispatch => {
        try {
            const response = await axios.get('feed/'+feedId, header(token))
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.received) {
                dispatch(setFeed(response.data.feed));
            } else {
                const error = new Error(response.data.error);
                throw error;
            } 
        } catch(error) {
            dispatch(feedError(error.message));
            throw error;
        }
    }
}


export const setFeed = (feed) => {
    return {
        type: actionTypes.SET_FEED,
        feed,
    }
}

export const fetchUserFeeds = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('feed/creator/'+userId, header(token))
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.received) {
                dispatch(setUserFeeds(response.data.userFeeds));
            } else {
                const error = new Error(response.data.error);
                throw error;
            } 
        } catch(error) {
            dispatch(feedError(error.message));
            throw error;
        }
    }
}

export const setUserFeeds = (feeds) => {
    const loadedFeeds = [];
    for(let key in feeds) {
        loadedFeeds.push(feeds[key]);
    }

    return {
        type: actionTypes.SET_USER_FEEDS,
        userFeeds: loadedFeeds,
    }
}

export const fetchCurrentUserFeeds = (token, userId) => {
    return async dispatch => {
        try {
            const response = await axios.get('feed/creator/'+userId, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.received) {
                dispatch(setCurrentUserFeeds(response.data.userFeeds));
            } else {
                const error = new Error(response.data.error);
                throw error;
            } 
        } catch(error) {
            dispatch(feedError(error.message));
            throw error;
        }
    }
}

export const setCurrentUserFeeds = (feeds) => {
    const loadedFeeds = [];
    for(let key in feeds) {
        loadedFeeds.push(feeds[key]);
    }

    return {
        type: actionTypes.SET_CURRENT_USER_FEEDS,
        currentUserFeeds: loadedFeeds,
    }
}

export const addTitle = (title) => {
    return {
        type: actionTypes.ADD_TITLE,
        title,
    }
}


export const addGallery = (token, galleryItem) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('type', galleryItem.type);
        formData.append('parent', galleryItem.parent);
        formData.append('image', galleryItem.image);
        formData.append('video', galleryItem.video);
        console.log(formData);
        try {
            const response = await axios.post('gallery/add', formData, header(token, true));
            console.log(response.data);
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.added) {
                dispatch(setGallery(galleryItem, response.data.galleryItem.id));
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


export const setGallery = (galleryItem, galleryId) => {
    return {
        type: actionTypes.ADD_GALLERY,
        galleryItem,
        galleryId,
    }
}


export const addDescription = (description) => {
    return {
        type: actionTypes.ADD_DESCRIPTION,
        description,
    }
}


export const addFeed = (token, feedData) => {
    return async dispatch => {
        try {
            const response = await axios.post('feed/add/', feedData, header(token));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.created) 
                dispatch(feedSuccess());
            else {
                const message = "Due to some error at the server, feed cannot be created at the moment";
                const error = new Error(message)
                throw error;
            }
        } catch(error) {
            dispatch(feedError(error.message));
            throw error;
        }
    }
}

export const resetFeed = () => {
    return {
        type: actionTypes.RESET_FEED,
    }
}


export const deleteFeed = (token, feedId) => {
    return async dispatch => {
        try {
            const response = await axios.delete('feed/'+feedId+'/delete', header(token));
            if(response.data.deleted) {
                dispatch(feedSuccess());
            } else {
                dispatch(feedError("Due to some error at the server, feed cannot be deleted at the moment"));
            }
        } catch(error) {
            dispatch(feedError("Cannot delete feed at the moment!"));
        }
    }
}


export const feedSuccess = () => {
    return {
        type: actionTypes.FEED_SUCCESS,
    }
}

export const feedError = (errorMessage) => {
    return {
        type: actionTypes.FEED_ERROR,
        error: errorMessage,
    }
}