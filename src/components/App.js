import React from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Feeds from "./Feeds";
import Login from "./Login";
import SingUp from "./SignUp";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import axios from 'axios'
import {ChakraProvider} from "@chakra-ui/react"
import {useDispatch, useSelector} from "react-redux";
import logOut, {setAuthenticated, setUsername} from "../redux/actions";
import Profile from "./Profile";

const setupInterceptor = (history, login, logout) => {
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'https://programming-pair-back.herokuapp.com'

    // axios.defaults.baseURL = 'http://localhost:3131'
    // request interceptors will insert authorization header
    axios.interceptors.request.use(function (config) {
        let accessToken = localStorage.getItem('programming-pair-accessToken')
        config.headers['authorization'] = `Bearer ${accessToken}`
        config.headers['Access-Control-Allow-Origin'] = '*'
        return config
    }, function (error) {
        return Promise.reject(error)
    })
    // response interceptors handle the error when the response with authorization
    // header fails
    axios.interceptors.response.use(function (response) {
        // login()
        return response
    }, async function (error) {
        const originalRequest = error.config
        console.log(error)
        let {status} = error.response
        if (status === 401) {
            // accessToken expired
            if (!originalRequest._retry) {
                // first request
                originalRequest._retry = true
                // create new accessToken with refresh Token
                let username = await saveNewToken()
                login(username)
                return axios(originalRequest)
                //resend the request with new accessToken
            }
        }
        // history.replace('/login')
        if (status === 403) {
            logout()
        }

        return Promise.reject(error)
    })
}

async function saveNewToken() {
    let res = await axios.post('/users/token', {refreshToken: localStorage.getItem('programming-pair-refreshToken')})
    console.log(res)
    localStorage.setItem('programming-pair-accessToken', res.data.accessToken)
    return res.data.username
}

function App() {
    let history = useHistory()
    let dispatch = useDispatch()
    let isAuthenticated = useSelector(state => state.app.isAuthenticated)
    const login = (username) => {
        if (username)
            dispatch(setUsername(username))
        if (!isAuthenticated) {
            dispatch(setAuthenticated(true))
        }
    }


    const logout = async () => {
        if (isAuthenticated)
            dispatch(logOut())
    }
    // const logout =
    setupInterceptor(history, login, logout)
    return (
        <ChakraProvider>
            <Switch>
                <Route exact path={'/'}>
                    {isAuthenticated ? <Redirect to={'/feeds'}/> : <Redirect to={'/login'}/>}
                    {/*<Redirect to={'/feeds'}/>*/}
                </Route>
                <Route path={'/login'}>
                    {isAuthenticated ? <Redirect to={'/feeds'}/> : <Login login={login}/>}
                    {/*<Login login={login}/>*/}
                </Route>
                <Route path={'/sign_up'} component={SingUp}/>
                <ProtectedRoute path={'/feeds'} Component={Feeds} isAuthenticated={isAuthenticated}/>
                <ProtectedRoute path={'/profile/:username'} Component={Profile} isAuthenticated={isAuthenticated}/>
                {/*<Route path={'/feeds'}>*/}
                {/*    <Feeds/>*/}
                {/*</Route>*/}
                <Route path={'*'} component={NotFound}/>
            </Switch>
        </ChakraProvider>
    );
}

export default App;
