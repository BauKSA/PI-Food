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
            let obj = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                score: document.getElementById("score").value,
                healthy: document.getElementById("healthy").value,
                howto: document.getElementById("howto").value,
                diets: document.getElementById("diet").value
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
                    <form>
                        name:<input type="text" id="name"></input>
                        description:<textarea id="description"></textarea>
                        score:<input type="range" id="score" min="1" max="100"></input>
                        healthy:<input type="range" id="healthy" min="1" max="100"></input>
                        howto:<textarea id="howto"></textarea>
                        diet:<input type="text" id="diet"></input>
                        <button onClick={this.onSubmit}>SEND</button>
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