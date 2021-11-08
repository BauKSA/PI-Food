import React from "react";
import { connect } from 'react-redux'
import { addRecipe } from "../store/actions"
import {Link} from 'react-router-dom';

class PostRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            created: false
        }
        this.onSubmit = (e)=>{
            e.preventDefault();
            let diet = [];
            if(document.getElementById("vegetarian").checked){
                diet.push("vegetarian")
            }
            if(document.getElementById("vegan").checked){
                diet.push("vegan")
            }
            if(document.getElementById("glutenfree").checked){
                diet.push("gluten free")
            }
            if(document.getElementById("dairyfree").checked){
                diet.push("dairy free")
            }
            let obj = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                score: document.getElementById("score").value,
                healthy: document.getElementById("healthy").value,
                howto: document.getElementById("howto").value,
                diets: diet,
                vegetarian: document.getElementById("vegetarian").checked,
                vegan: document.getElementById("vegan").checked,
                glutenfree: document.getElementById("glutenfree").checked,
                dairyfree: document.getElementById("dairyfree").checked
            }
            JSON.stringify(obj);
            this.props.addRecipe(obj)
            this.setState({
                created: true
            })
        }
    }

    render(){
        if(this.state.created){
            return(
                <div>
                    SUCCESSFULLY CREATED
                    <Link to="/home">
                        <button>BACK TO HOME</button>
                    </Link>
                    <button onClick={(e)=>{
                        e.preventDefault();
                        this.setState({
                            created: false
                        })
                    }}>CREATE ANOTHER RECIPE</button>
                </div>
            )
        }else{
            return(
                <div>
                    <form onSubmit={this.onSubmit}>
                        name:<input type="text" id="name"></input>
                        description:<textarea id="description"></textarea>
                        score:<input type="range" id="score" min="1" max="100"></input>
                        healthy:<input type="range" id="healthy" min="1" max="100"></input>
                        howto:<textarea id="howto"></textarea>
                        vegetarian:<input type="checkbox" id="vegetarian"/>
                        vegan:<input type="checkbox" id="vegan"/>
                        glutenfree:<input type="checkbox" id="glutenfree"/>
                        dairyfree:<input type="checkbox" id="dairyfree"/>
                        <button type="submit">SEND</button>
                    </form>
                    <Link to="/home">
                        <button>GO BACK</button>
                    </Link>
                </div>
            )
        }
    }
}

const mapDispatchToProps = {
    addRecipe
}
const conexion = connect(null, mapDispatchToProps)
export default  conexion(PostRecipe);