import * as actionTypes from '../ActionTypes';

const initialState = {
    stories: [],
    media: null,
    mediaId: null,
    error: null,
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_STORIES:
            return {
                ...state,
                stories: action.stories,
            };
        case actionTypes.SET_MEDIA:
            return {
                ...state,
                mediaId: action.mediaId,
                media: action.media,
            };
        case actionTypes.STORY_SUCCESS:
            return {
                ...state,
                media: null,
                mediaId: null,
                error: null,
            };
        case actionTypes.STORY_FAIL:
            return {
                ...state,
                media: null,
                mediaId: null,
                error: action.error,
            };
        default:
            return state;
    }
}

export default reducer;