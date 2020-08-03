import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        id: id
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expiration');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkTokenExpiration = (expirationTime) => {
    return dispatch => {
        setTimeout(()=>{
            dispatch(authLogout());
        }, expirationTime * 1000 )
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQd9neMlQq4PhiviD9d7rwGFSI9rnxg1I'

        if (isSignUp){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQd9neMlQq4PhiviD9d7rwGFSI9rnxg1I'
        }
        axios.post(url, authData)
            .then(response => {
                const expiration = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expiration', expiration);
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkTokenExpiration(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error));
            })
    }
}

export const logFromStorage = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token){
            dispatch(authLogout());
        }else{
            const expiration = new Date(localStorage.getItem('expiration'))
            if (expiration > new Date()){
                dispatch(authSuccess(localStorage.getItem('token'), localStorage.getItem('userId')))
                dispatch(checkTokenExpiration((expiration.getTime() - new Date().getTime()) / 1000) )
            }else{
                dispatch(authLogout());
            }
        }
    }
}
