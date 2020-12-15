import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS,} from '../actions/types'


const initialState ={
    token: window.sessionStorage.getItem('token'),
    isAuthenticated: null,
    isLaoding: false,
    user: JSON.parse(window.sessionStorage.getItem('user'))
}

export default function(state= initialState, action){
    switch(action.type){
        case USER_LOADING:
            return{
                ...state,
                isLaoding:true
            }

        case USER_LOADED:
                return{
                    ...state,
                    isAuthenticated:true,
                    isLaoding:false,
                    user: action.payload
                }
                
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            window.sessionStorage.setItem('token', action.payload.token)
            window.sessionStorage.setItem('user', JSON.stringify(action.payload.user))
            return{
                ...state,
                ...action.payload,
                    isAuthenticated:true,
                    isLaoding:false,
            }
        
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('user')
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isLoading:false
            }

        default:
            return state
    }
}