import {SET_AUTHENTICATED, SET_ERROR, SET_LOADING} from "../actions/types";

const initialState = {
    loading: false,
    isAuthenticated: Boolean(localStorage.getItem('programming-pair-accessToken')),
    error: ''
}

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case SET_LOADING:
            state.loading = action.payload.status
            break
        case SET_AUTHENTICATED:
            state.isAuthenticated = action.payload.status
            break
        case SET_ERROR:
            state.error = action.payload.msg
            break
        default:
            break
    }
    return JSON.parse(JSON.stringify(state))
}



