import React from "react";
import './styles/recipeInfo.css'

class RecipeInfo extends React.Component{

    render(){
        let diets = [];
        let recipe = {};
        if(this.props.obj.length > 0){
            recipe = this.props.obj[0];
        }else{
            recipe = this.props.obj;
        }
        if(this.props.diets){
            diets = this.props.diets;
        }
        if(document.getElementById("desc-inner") && document.getElementById("how-inner")){
            document.getElementById("desc-inner").innerHTML = recipe.description;
            document.getElementById("how-inner").innerHTML = recipe.howto;
        }
        return(
            <div className="main.container">
                <div className="title-container">
                    <h1 className="title">{recipe.name}</h1>
                </div>
                <br/><br/>
                <div className="info-container">
                    <div className="img-container">
                        <img className="image" src={recipe.img} alt={recipe.name}/>
                    </div>
                    <div className="info">
                        <div className="scores">
                            SCORE<progress className="pro" value={recipe.score} max="100"/>
                            HEALTHY<progress className="pro" value={recipe.healthy} max="100"/>
                        </div>
                        <div className="diets">
                            <div className="principal-diets">
                                {
                                    diets.map((diet)=>{
                                        if(diet === "vegetarian" || diet === "vegan" || diet === "gluten free" || diet === "dairy free"){
                                            return(
                                                <p className="dietP" key={diet}>&nbsp;&#10084;&nbsp;{diet}&nbsp;</p>
                                            )
                                        }else{
                                            return null;
                                        }
                                    })
                                }
                            </div>
                            <div className="second-diets">
                            {
                                    diets.map((diet)=>{
                                        if(diet === "vegetarian" || diet === "vegan" || diet === "gluten free" || diet === "dairy free"){
                                            return null;
                                        }else{
                                            return(
                                                <p className="dietS" key={diet}>&nbsp;{diet}&nbsp;</p>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="desc-how">
                    <div className="description-container">
                        <div>
                            <h3 className="desc-title">Description</h3>
                        </div>
                        <div id="desc-inner"></div>
                    </div>
                    <div className="howto-container">
                        <div>
                            <h3 className="how-title">How to</h3>
                        </div>
                        <div id="how-inner"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RecipeInfo;