import React from "react";
import './styles/resultCard.css';

class ResultCard extends React.Component{
    constructor(props){
        super(props);
        this.getDiet = ()=>{
            let diets = [];
            if(this.props.result.vegetarian){
                diets.push("Vegetarian");
            }
            if(this.props.result.vegan){
                diets.push("Vegan");
            }
            if(this.props.result.glutenfree){
                diets.push("Gluten Free");
            }
            if(this.props.result.dairyfree){
                diets.push("Dairy Free");
            }

            return diets;
        }
    }

    render(){
        console.log(this.props.result)
        return(
            <div className="card-main">
                <div className="card-img">
                    <img src={this.props.result.img} alt={this.props.result.name} className="result-img"/>
                </div>
                <div className="card-info">
                    <div>
                        <p className="card-title">{this.props.result.name}</p>
                    </div>
                    <div className="zorongo">
                        <div className="card-score">
                            <span className="score-diet">score: </span>
                            <progress value={this.props.result.score} max="100" id="score-bar"/>
                        </div>
                        <div  className="card-healthy">
                            {this.getDiet().map((diet)=>{
                                return(
                                    <div id="diet">
                                        <span className="score-diet">{diet}</span>
                                        <br/>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ResultCard;