import {Route, Redirect} from "react-router-dom";

export default function ProtectedRoute({
                                           Component,
                                           isAuthenticated,
                                           ...rest
                                       }) {
    return <Route
        {...rest}
        render={(props) => isAuthenticated ? <Component/> :
            <Redirect to={{pathname: '/', state: {from: props.location}}}
            />
        }
    />
}