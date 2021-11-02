import axios from 'axios';

export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const SEARCH_BY_DIET = "SEARCH_BY_DIET";
export const GET_BY_ID = "GET_BY_ID";

export function searchByName(name){
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

export function getById(id){
    return function(dispatch){
        axios.get(`http://localhost:3002/api/recipes/${id}`)
        .then((response)=>{
            dispatch({
                type: GET_BY_ID,
                payload: response.data
            })
        })
    }
}

export function addRecipe(data){
        return function(dispatch){
            axios.post('http://localhost:3002/api/addrecipe', data)
            .then((response)=>{
                console.log(response);
            })
        }
        
}