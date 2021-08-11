import {SET_AUTHENTICATED, SET_ERROR, SET_FEEDS, SET_LOADING, SET_SUGGESTIONS, SET_USERNAME} from "./types";
import axios from "axios";

export const setLoading = (status) => ({
    type: SET_LOADING,
    payload: {status}
})
export const setAuthenticated = (status) => ({
    type: SET_AUTHENTICATED,
    payload: {status}
})
export const setUsername = (username) => ({
    type: SET_USERNAME,
    payload: {username}
})

export const setFeeds = (feeds) => ({
    type: SET_FEEDS,
    payload: {feeds}
})
export const setSuggestions = (suggestions) => ({
    type: SET_SUGGESTIONS,
    payload: {suggestions}
})

export const setError = (msg) => ({
    type: SET_ERROR,
    payload: {msg}
})

export const setPosts = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get('/posts/feed')
            if (response.data.success) {
                dispatch(setFeeds(response.data.result))
                dispatch(setUsername(response.data.username))
                dispatch(setAuthenticated(true))
            }
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}
export const getSuggestions = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get('/users/suggestions')
            if (response.data.success) {
                console.log(response.data.result)
                dispatch(setSuggestions(response.data.result))
            }
        } catch (e) {
            dispatch(setError(e.message))
        }
    }
}
export default function logOut() {
    return async function (dispatch) {
        // let res = await axios.get('/users/logout')
        // console.log(res)
        // if (res.status === 200) {
        dispatch(setAuthenticated(false))
        dispatch(setUsername(null))
        localStorage.setItem('programming-pair-accessToken', '')
        localStorage.setItem('programming-pair-refreshToken', '')
        // } else dispatch(setError('Error in request'))
    }
}