import * as actionTypes from '../ActionTypes';

const initialState = {
    feeds: [],
    feed: null,
    userFeeds: [],
    currentUserFeeds: [],
    postTitle: null,
    postGallery: [],
    postGalleryIds: [],
    postDescription: null,
    done: false,
    error: null,
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_FEEDS:
            return {
                ...state,
                feeds: action.feeds,
            }
        case actionTypes.SET_USER_FEEDS:
            return {
                ...state,
                userFeeds: action.userFeeds,
            }
        case actionTypes.SET_CURRENT_USER_FEEDS:
            return {
                ...state,
                currentUserFeeds: action.currentUserFeeds,
            }
        case actionTypes.SET_FEED:
            return {
                ...state,
                feed: action.feed,
            }
        case actionTypes.ADD_TITLE:
            return {
                ...state,
                postTitle: action.title,
            }
        case actionTypes.ADD_GALLERY:
            return {
                ...state,
                postGallery: [...state.postGallery, action.galleryItem],
                postGalleryIds: [...state.postGalleryIds, action.galleryId],
            }
        case actionTypes.ADD_DESCRIPTION:
            return {
                ...state,
                postDescription: action.description,
            }
        case actionTypes.RESET_FEED:
            return {
                ...state,
                postTitle: null,
                postDescription: null,
                postGallery: [],
                postGalleryIds: [],
            }
        case actionTypes.FEED_SUCCESS:
            return {
                ...state,
                done: true,
            }
        case actionTypes.FEED_ERROR:
            return {
                ...state,
                done: false,
                error: action.error,
            }
        default:
            return state;
    }
}

export default reducer;