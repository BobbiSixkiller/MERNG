import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';

function AuthRoute({ component: Component, ...rest}) {
    const { user } = React.useContext(AuthContext);

    return (
        <Route
            {...rest}
            render={props =>
                user ? <Redirect to ="/" /> : <Component {...props} />
            }
        />
    )
}

export default AuthRoute;