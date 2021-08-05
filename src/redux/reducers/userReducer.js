import {SET_FEEDS, SET_SUGGESTIONS, SET_USERNAME} from "../actions/types";

const initialState = {
    username: null,
    feeds: [],
    suggestions: []
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USERNAME:
            state.username = action.payload.username
            break
        case SET_FEEDS:
            state.feeds = action.payload.feeds.slice()
            break
        case SET_SUGGESTIONS:
            state.suggestions = action.payload.suggestions
            break
        default:
            break
    }
    return JSON.parse(JSON.stringify(state))
}



