import React from "react";
import { connect } from 'react-redux'
import { addRecipe, getDiets } from "../store/actions"
import {Link} from 'react-router-dom';
import './styles/postRecipe.css';

class PostRecipe extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            created: false,
            diets: []
        }
        this.onSubmit = (e)=>{
            e.preventDefault();
            let diet = [];
            let vegetarian = false;
            let vegan = false;
            let glutenfree = false;
            let dairyfree = false;
            if(document.getElementById("vegetarian")?.checked){
                diet.push("vegetarian");
                vegetarian = true;
            }
            if(document.getElementById("vegan")?.checked){
                diet.push("vegan");
                vegan = true;
            }
            if(document.getElementById("glutenfree")?.checked){
                diet.push("gluten free");
                glutenfree = true;
            }
            if(document.getElementById("dairyfree")?.checked){
                diet.push("dairy free");
                dairyfree = true;
            }
            if(document.getElementById("ketogenic")?.checked){
                diet.push("ketogenic");
                dairyfree = true;
            }
            if(document.getElementById("lacto-vegetarian")?.checked){
                diet.push("lacto vegetarian");
                dairyfree = true;
            }
            if(document.getElementById("ovo-vegetarian")?.checked){
                diet.push("ovo vegetarian");
                dairyfree = true;
            }
            if(document.getElementById("pescetarian")?.checked){
                diet.push("pescetarian");
                dairyfree = true;
            }
            if(document.getElementById("paleo")?.checked){
                diet.push("paleo");
                dairyfree = true;
            }
            if(document.getElementById("primal")?.checked){
                diet.push("primal");
                dairyfree = true;
            }
            if(document.getElementById("low-FODMAP")?.checked){
                diet.push("low FODMAP");
                dairyfree = true;
            }
            if(document.getElementById("whole30")?.checked){
                diet.push("whole30");
                dairyfree = true;
            }
            let obj = {
                name: document.getElementById("name").value,
                description: document.getElementById("description").value,
                score: document.getElementById("score").value,
                healthy: document.getElementById("healthy").value,
                howto: document.getElementById("howto").value,
                diet: diet,
                vegetarian: vegetarian,
                vegan: vegan,
                glutenfree: glutenfree,
                dairyfree: dairyfree,
                img: document.getElementById("image-input").value
            }
            JSON.stringify(obj);
            this.props.addRecipe(obj)
            this.setState({
                created: true
            })
        }

        this.getDiet = (e)=>{
            e.preventDefault();
            e.target.disabled = true;
            this.props.getDiets();
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
                <div className="form-container">
                    <div className="create-form">
                        <form onSubmit={this.onSubmit}>
                            <table summary="Create a new recipe!" className="table-form">
                                <tbody>
                                    <tr>
                                        <th className="label-form">Name</th>
                                        <td>
                                            <input className="input-text" type="text" id="name" required={true} autoComplete="false"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="label-form">Description</th>
                                        <td>
                                            <textarea className="input-area" id="description" required={true} autoComplete="false"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="label-form">How to</th>
                                        <td>
                                            <textarea className="input-area" id="howto" required={true} autoComplete="false"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="label-form">Score</th>
                                        <td>
                                            <input type="range" id="score" min="1" max="100"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="label-form">Healthy</th>
                                        <td>
                                            <input type="range" id="healthy" min="1" max="100"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th className="label-form">Image</th>
                                        <td>
                                            <input type="text" id="image-input"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th/>
                                        <td>
                                            <button type="submit" className="submit-button">SEND</button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th/>
                                        <td>
                                            <button onClick={this.getDiet}>Add diets</button>
                                        </td>
                                    </tr>
                                    {this.props.diets.map((diet)=>{
                                        return(
                                            <tr key={diet}>
                                                <th>{diet}</th>
                                                <td>
                                                    <input type="checkbox" id={diet}></input>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </form>
                    </div>
                    <div>
                    </div>
                    <span className="back-button-container">
                        <Link to="/home">
                            <button  className="back-button">GO BACK</button>
                        </Link>
                    </span>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        diets: state.diets
    }
}

const mapDispatchToProps = {
    getDiets,
    addRecipe
}
const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(PostRecipe);