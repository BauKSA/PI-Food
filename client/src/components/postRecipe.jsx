import React from "react";
import { connect } from 'react-redux'
import { addRecipe } from "../store/actions"

class PostRecipe extends React.Component{
    constructor(props){
        super(props);
        this.onSubmit = (e)=>{
            e.preventDefault();
            let obj = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                score: document.getElementById("score").value,
                healthy: document.getElementById("healthy").value,
                howto: document.getElementById("howto").value
            }
            JSON.stringify(obj);
            this.props.addRecipe(obj)
        }
    }

    render(){
        return(
            <div>
                <form>
                    name:<input type="text" id="name"></input>
                    description:<textarea id="description"></textarea>
                    score:<input type="range" id="score" min="1" max="100"></input>
                    healthy:<input type="range" id="healthy" min="1" max="100"></input>
                    howto:<textarea id="howto"></textarea>
                    <button onClick={this.onSubmit}>SEND</button>
                </form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addRecipe
}
const conexion = connect(null, mapDispatchToProps)
export default  conexion(PostRecipe);