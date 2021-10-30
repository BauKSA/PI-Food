import React from 'react'
import { connect } from 'react-redux'
import { searchByName, getById } from "../store/actions"
import {getOrder, setOrder} from '../funciones/orderFunctions';
import { Link } from 'react-router-dom';

class NameRecipes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            pag: 0,
            recipes: [],
            order: '',
            recipeInfo: [],
            recipe: false
        };
        this.paginado = ()=>{
                if(this.props.recipes){
                    let results = getOrder(this.state.order, this.props.recipes);
                    let pagRecipes = [];
                    if(this.state.pag * 9 <= results.length){
                        for(let i = 0; i < 9; i++){
                            if(results[(this.state.pag * 9) + i]){
                                pagRecipes.push(results[(this.state.pag * 9) + i]);
                            }
                        }
                    }
                    return pagRecipes;
                }
        }
        this.nextPage = (e)=>{
            e.preventDefault();
            let results = this.props.recipes;
            if(results.length < ((this.state.pag + 2) * 9)){
                e.target.disabled = true;
            }    
            if(results.length >= ((this.state.pag + 1) * 9)){
                document.getElementById("botonBack").disabled = false;
                this.setState({
                    ...this.state,
                    pag: this.state.pag + 1
                })
            }
        }
        this.backPage = (e)=>{
            e.preventDefault();
            if((this.state.pag - 1) <= 0){
                e.target.disabled = true;
            }
            if(this.state.pag > 0){
                document.getElementById("botonNext").disabled = false;
                this.setState({
                    ...this.state,
                    pag: this.state.pag - 1
                })
            }
        }
        this.onSubmit = (e)=>{
            e.preventDefault();
            this.props.searchByName(this.state.search);
            setTimeout(()=>{
                this.reset();
            }, 1000)
        }
        this.onInputChange = (e)=>{
            this.setState({
                ...this.state,
                search: e.target.value
            })
        }
        this.showInfo = (e)=>{
            e.preventDefault();
            console.log(e.target.id)
            this.props.getById(e.target.id)
            this.setState({
                ...this.state,
                recipeInfo: this.props.recipes,
                recipe: true
            })
        }
        this.reset = ()=>{
            if(document.getElementById("botonNext") && document.getElementById("botonBack")){
                document.getElementById("botonNext").disabled = false;
                document.getElementById("botonBack").disabled = true;
            }
            this.setState({
                ...this.state,
                pag: 0,
                order: '',
                recipeInfo: [],
                recipe: false
            })
        }
    }
    
    render() {
        let results = this.paginado();
        if(results[0] && !this.state.recipe){
            return (
                <div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" value={this.state.search} onChange={this.onInputChange}/>
                            <button id="botonSearch">SEARCH</button>
                        </form>
                    </div>
                    <div>
                        <h5>SORT BY</h5>
                        <button onClick={()=>{setOrder('AZ', this)}}>A to Z</button>
                        <button onClick={()=>{setOrder('ZA', this)}}>Z to A</button>
                        <button onClick={()=>{setOrder('100', this)}}>SCORE MAX to MIN</button>
                        <button onClick={()=>{setOrder('000', this)}}>SCORE MIN to MAX</button>
                    </div>
                    <div>
                        {
                            results.map((result)=>{
                                return(
                                    <div key={result.id}>
                                        <h3>{result.name}</h3>
                                        <img src={result.img}/>
                                        <button id={result.id} onClick={this.showInfo}>Show</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={this.backPage} id="botonBack">BACK</button>
                    <button onClick={this.nextPage} id="botonNext">NEXT</button>
                </div>    
            )
        }else if(this.state.recipeInfo[0]){
            return(
                <div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" value={this.state.search} onChange={this.onInputChange}/>
                            <button id="botonSearch">SEARCH</button>
                        </form>
                    </div>
                    <div>
                        {this.state.recipeInfo[0].name}
                    </div>
                </div>
            )
        }else{
            console.log(this.state.recipeInfo)
            return(
                <div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" value={this.state.search} onChange={this.onInputChange}/>
                            <button id="botonSearch">SEARCH</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes
    }
}
const mapDispatchToProps = {
    searchByName,
    getById
}
const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(NameRecipes);