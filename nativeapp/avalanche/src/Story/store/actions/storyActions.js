import axios from '../../../../axios-config';
import header from '../../../../constants/Header';
import * as actionTypes from '../ActionTypes';

export const fetchStories = (token) => {
    return async dispatch => {
        try {
            const response = await axios.get('story/', header(token));
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            dispatch(setStories(response.data.stories));
        } catch (error) {
            dispatch(storyFail(error.message));
        }
    }
}

export const setStories = (stories) => {
    const loadedStories = [];

    for (let key in stories) {
        loadedStories.push(stories[key]);
    }

    return {
        type: actionTypes.SET_STORIES,
        stories: loadedStories,
    };
}

export const addMedia = (token, mediaItem) => {
    return async dispatch => {
        const formData = new FormData();
        formData.append('type', mediaItem.type);
        formData.append('parent', mediaItem.parent);
        formData.append('image', mediaItem.image);
        formData.append('video', mediaItem.video);
        try {
            const response = await axios.post('gallery/add', formData, header(token, true));
            if(response.data.error) {
                const error = new Error(response.data.error);
                throw error;
            }
            if(response.data.added) {
                dispatch(setMedia(mediaItem, response.data.galleryItem.id));
            }
            else {
                const errorMessage = "Server is facing some issue while adding the gallery item! please try again later";
                const error = new Error(errorMessage);
                throw error;
            } 
        } catch(error) {
            console.log('error : ',error);
            dispatch(storyFail(error.message));
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


export const addStory = (token, story) => {
    return async dispatch => {
        try {
            const response = await axios.post('story/add', story, header(token));
            if (response.data.error) {
                throw new Error(response.data.error);
            }
            dispatch(storySuccess());
        } catch (error) {
            dispatch(storyFail(error.message));
        }
    }
}

export const storySuccess = () => {
    return {
        type: actionTypes.STORY_SUCCESS
    }
}

export const storyFail = (error) => {
    return {
        type: actionTypes.STORY_FAIL,
        error,
    }
}