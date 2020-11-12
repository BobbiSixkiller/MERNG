import React, { useReducer } from 'react';
import jwtDecode from 'jwt-decode';

const INITIAL_STATE = {
    user: null
}

if (localStorage.getItem('jwtToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        INITIAL_STATE.user = decodedToken;
    }
}

const AuthContext = React.createContext({
    user: null,
    login: function(data) {},
    logout: function() {}
});

function authReducer(state, action) {
    switch(action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default: 
         return state;
    }
}

function AuthProvider(props) {
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE);

    function login(data) {
        localStorage.setItem("jwtToken", data.token);
        dispatch({
            type: 'LOGIN',
            payload: data
        });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        dispatch({ type: 'LOGOUT' });
    }

    return(
        <AuthContext.Provider
            value={{ user: state.user, login, logout }}
            {...props}
        />
    );
}

export { AuthContext, AuthProvider }