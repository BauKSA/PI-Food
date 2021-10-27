import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { searchByName } from "../store/actions";
import Recipe from "./recipe";

export default function AllRecipes(){
    let recipes = useSelector((state)=>state.recipes);
    let dispatch = useDispatch();
    useEffect(()=>{
        dispatch(searchByName());
    }, [])
    console.log(recipes)
    return(
        <div>
            {recipes.map((recipe)=>{
                return <Recipe name={recipe.name} img={recipe.img} />
            })}
        </div>
    )
}