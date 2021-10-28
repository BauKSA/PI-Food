import axios from 'axios';

export const SEARCH_ALL = "SEARCH_ALL";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const SEARCH_BY_DIET = "SEARCH_BY_DIET";
export const GET_BY_ID = "GET_BY_ID";

export function searchAll(){
    return function(dispatch){
        axios.get('http://localhost:3002/api/recipes/')
        .then((response)=>{
            dispatch({
                type: SEARCH_ALL,
                payload: response.data
            })
        })
    }
}

export function searchByName(name, pag){
    console.log(pag)
    return function(dispatch){
        axios.get(`http://localhost:3002/api/recipes?name=${name}`)
        .then((response)=>{
            dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data
            })
        })
    }
}