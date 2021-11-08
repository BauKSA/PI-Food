import React from 'react'
import { connect } from 'react-redux'
import { searchByName, getById } from "../store/actions"
import {getOrder, setOrder} from '../funciones/orderFunctions';
import RecipeInfo from './RecipeInfo';
import ResultCard from './ResultCard';
import './styles/nameRecipes.css';
import { Link } from 'react-router-dom';

class NameRecipes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            pag: 0,
            order: '',
            recipe: false
        };
        this.paginado = ()=>{
                if(this.props.recipes && !this.state.recipe){
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
                }else if(this.state.recipe){
                    return this.props.recipe
                }else{
                    return [0]
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
            this.reset();
            this.props.searchByName(this.state.search, this);
        }
        this.onInputChange = (e)=>{
            this.setState({
                ...this.state,
                search: e.target.value
            })
        }
        this.showInfo = (e)=>{
            e.preventDefault()
            this.props.getById(e.target.id, this)
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
                recipes: [],
                recipe: false
            })
        }

        this.back = (e)=>{
            e.preventDefault();
            this.setState({
                ...this.state,
                recipe: false
            })
        }
    }
    
    render() {
        if(this.state.pag < 1 && document.getElementById("botonBack")){
            document.getElementById("botonBack").disabled = true;
        }
        let results = this.paginado();
        if(results[0] && !this.state.recipe){
            console.log(results);
            return (
                <div>
                    <div className="search-container">
                            <form onSubmit={this.onSubmit}>
                                <span className="back-form">
                                    <input className="input-search" type="text" value={this.state.search} onChange={this.onInputChange}/>
                                    <button className="input-button" id="botonSearch">SEARCH</button>
                                </span>
                            </form>
                    </div>
                    <div className="sort-container">
                        <span className="back">
                            <h5 className="sort">SORT BY</h5>
                            <button id="first-button" className="order-button" onClick={()=>{setOrder('AZ', this)}}>A to Z</button>
                            <button className="order-button" onClick={()=>{setOrder('ZA', this)}}>Z to A</button>
                            <button className="order-button" onClick={()=>{setOrder('100', this)}}>SCORE MAX to MIN</button>
                            <button id="last-button" className="order-button" onClick={()=>{setOrder('000', this)}}>SCORE MIN to MAX</button>
                        </span>
                    </div>
                    <div>
                        {
                            results.map((result)=>{
                                return(
                                    <div key={result.id} className="card-container">
                                        <ResultCard result={result}/>
                                        <button id={result.id} onClick={this.showInfo} className="button-show">Show</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="pButton-container">
                        <button className="button-page" onClick={this.backPage} id="botonBack">BACK</button>
                        <p className="page-number">{this.state.pag + 1}</p>
                        <button className="button-page" onClick={this.nextPage} id="botonNext">NEXT</button>
                    </div>
                </div>    
            )
        }else if(results[0] === 0 && !this.state.recipe){
            return(
                <div>
                    <div className="search-container">
                        <form onSubmit={this.onSubmit}>
                            <span id="only-search" className="back-form">
                                <input className="input-search" type="text" value={this.state.search} onChange={this.onInputChange} />
                                <button className="input-button" id="botonSearch">SEARCH</button>
                            </span>
                        </form>
                    </div>
                    <div className="any">
                        ANY RESULTS
                    </div>
                    <div>
                        <Link to="/addrecipe">
                            <button className="button-create">Create it!</button>
                        </Link>
                    </div>
                </div>

            )
        }else if(this.state.recipe){
            return(
                <div>
                    <RecipeInfo obj={results} diets={results.diet} key={results.id}/>
                    <button id="goBack-button" onClick={this.back}>GO BACK</button>
                </div>
            )
        }else{
            return(
                <div className="search-container">
                    <form onSubmit={this.onSubmit}>
                        <span id="only-search" className="back-form">
                            <input className="input-search" type="text" value={this.state.search} onChange={this.onInputChange}/>
                            <button className="input-button" id="botonSearch">SEARCH</button>
                        </span>
                    </form>
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        recipes: state.recipes,
        recipe: state.recipe
    }
}
const mapDispatchToProps = {
    searchByName,
    getById
}
const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(NameRecipes);