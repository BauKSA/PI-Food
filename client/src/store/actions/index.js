import axios from 'axios';

export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const GET_DIETS = "GET_DIETS";
export const GET_BY_ID = "GET_BY_ID";

export function searchByName(name, obj){
    return function(dispatch){
        axios.get(`http://localhost:3002/api/recipes?name=${name}`)
        .then((response)=>{
            obj.setState({
                prevState: response.data
            })
            dispatch({
                type: SEARCH_BY_NAME,
                payload: response.data
            })
        })
    }
}

export function getById(id, obj){
    return function(dispatch){
        axios.get(`http://localhost:3002/api/recipes/${id}`)
        .then((response)=>{
            obj.setState({
                recipe: true
            })
            dispatch({
                type: GET_BY_ID,
                payload: response.data
            })
        })
    }
}

export function addRecipe(data){
        return function(){
            axios.post('http://localhost:3002/api/addrecipe', data)
            .then((response)=>{
                console.log(response);
            })
        }
        
}

export function getDiets(){
    return function(dispatch){
        axios.get('http://localhost:3002/api/getdiets')
        .then((response)=>{
            console.log(response)
            dispatch({
                type: GET_DIETS,
                payload: response.data
            })
        })
    }
}