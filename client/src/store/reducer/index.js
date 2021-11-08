import { SEARCH_BY_NAME, GET_BY_ID} from '../actions';

const initialState = {
    recipes: [],
    recipe: []
}

export default function reducer(state = initialState, actions){
    switch(actions.type){
        case SEARCH_BY_NAME:
            return{
                ...state,
                recipes: actions.payload
            }
        case GET_BY_ID:
            return{
                ...state,
                recipe: actions.payload
            }
        default:
            return state;
    }
}