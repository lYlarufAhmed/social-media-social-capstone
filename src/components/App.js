import React from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import Feeds from "./Feeds";
import Login from "./Login";
import SingUp from "./SignUp";
import NotFound from "./NotFound";
import ProtectedRoute from "./ProtectedRoute";
import {ChakraProvider} from "@chakra-ui/react"

function App() {
    let [isAuthenticated, setAuthenticated] = React.useState(false)

    const login = () => setAuthenticated(true)
    // const logout =
    return (
        <ChakraProvider>
            <Router>
                <Switch>
                    <Route exact path={'/'}>
                        {isAuthenticated ? <Redirect to={'/feeds'}/> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path={'/login'}>
                        <Login login={login}/>
                    </Route>
                    <Route path={'/sign_up'} component={SingUp}/>
                    <ProtectedRoute path={'/feeds'} Component={Feeds} isAuthenticated={isAuthenticated}/>
                    <Route path={'*'} component={NotFound}/>
                </Switch>
            </Router>
        </ChakraProvider>
    );
}

export default App;
