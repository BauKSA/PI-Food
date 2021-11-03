import React from "react";
import './styles/recipeInfo.css'

class RecipeInfo extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        let diets = [];
        if(this.props.diets){
            diets = this.props.diets;
        }
        if(document.getElementById("description") && document.getElementById("howto")){
            document.getElementById("description").innerHTML = this.props.obj.description;
            document.getElementById("howto").innerHTML = this.props.obj.howto;
        }
        return(
            <div className="main.container">
                <div className="title-container">
                    <h1 className="title">{this.props.obj.name}</h1>
                </div>
                <br/><br/>
                <div className="info-container">
                    <div className="img-container">
                        <img className="image" src={this.props.obj.img}/>
                    </div>
                    <div className="info">
                        <div className="scores">
                            SCORE<progress className="pro" value={this.props.obj.score} max="100"/>
                            HEALTHY<progress className="pro" value={this.props.obj.healthy} max="100"/>
                        </div>
                        <div className="diets">
                            <div className="principal-diets">
                                {
                                    diets.map((diet)=>{
                                        if(diet === "vegetarian" || diet === "vegan" || diet === "gluten free" || diet === "dairy free"){
                                            return(
                                                <p className="dietP">&nbsp;&#128154;{diet}&nbsp;</p>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="second-diets">
                            {
                                    diets.map((diet)=>{
                                        if(diet === "vegetarian" || diet === "vegan" || diet === "gluten free" || diet === "dairy free"){
                                        }else{
                                            return(
                                                <p className="dietS">&nbsp;{diet}&nbsp;</p>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="description"></div>
                <div id="howto"></div>
            </div>
        )
    }
}

export default RecipeInfo;