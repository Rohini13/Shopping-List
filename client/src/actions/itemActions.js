import axios from 'axios'
import { GET_ITEMS, ADD_ITEMS, DEL_ITEMS, LOADING} from './types'

export const getItems = () =>dispatch=>{
    dispatch(setLoading())
    axios
    .get('/api/items')
    .then(res=>
        dispatch({
            type:GET_ITEMS,
            payload:res.data
        }))
}

export const deleteItem = (id) =>dispatch=>{
    axios
    .delete(`/api/items/${id}`)
    .then(res => dispatch({
        type: DEL_ITEMS,
        payload: id
    }))
}

export const addItem = (item) =>dispatch=>{
    axios
    .post('/api/items', item)
    .then(res => dispatch({
        type: ADD_ITEMS,
        payload: res.data
    }))
}

export const setLoading = () =>{
    return {
        type: LOADING,
    }
}