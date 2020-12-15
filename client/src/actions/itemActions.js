import axios from 'axios'
import { GET_ITEMS, ADD_ITEMS, DEL_ITEMS, LOADING} from './types'
import { tokenConfig } from './authAction'
import {returnErrors} from './errorAction'

export const getItems = () =>dispatch=>{
    dispatch(setLoading())
    axios
    .get('/api/items')
    .then(res=>
        dispatch({
            type:GET_ITEMS,
            payload:res.data
        }))
    .catch(err=>dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) =>(dispatch, getState)=>{
    axios
        .delete(`/api/items/${id}`, tokenConfig(getState))
    .then(res => dispatch({
        type: DEL_ITEMS,
        payload: id
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const addItem = (item) =>(dispatch, getState)=>{
    axios
    .post('/api/items', item, tokenConfig(getState))
    .then(res => dispatch({
        type: ADD_ITEMS,
        payload: res.data
    }))
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const setLoading = () =>{
    return {
        type: LOADING,
    }
}