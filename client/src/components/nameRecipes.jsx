import React from 'react'
import { connect } from 'react-redux'
import { searchByName, getById } from "../store/actions"
import {getOrder, setOrder} from '../funciones/orderFunctions';
import RecipeInfo from './RecipeInfo';
import ResultCard from './ResultCard';
import './styles/nameRecipes.css';
import { Link } from 'react-router-dom';
import {getFilter, setFilter} from '../funciones/filterFunctions.js';

class NameRecipes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            pag: 0,
            order: '',
            recipe: false,
            filter: 'xxxx'
        };
        this.paginado = ()=>{
                if(this.props.recipes && !this.state.recipe){
                    let first = getFilter(this.state.filter, this.props.recipes);
                    let results = getOrder(this.state.order, first);
                    let pagRecipes = [];
                    if(this.state.pag * 9 <= results.length){
                        for(let i = 0; i < 9; i++){
                            if(results[(this.state.pag * 9) + i]){
                                pagRecipes.push(results[(this.state.pag * 9) + i]);
                            }
                        }
                    }
                    if(pagRecipes.length > 0){
                        return pagRecipes;
                    }else{
                        return [0];
                    }
                }else if(this.state.recipe){
                    return this.props.recipe
                }else{
                    return [0]
                }
        }
        this.nextPage = (e)=>{
            e.preventDefault();
            this.toTop(530);    
            this.setState({
                ...this.state,
                pag: this.state.pag + 1
            })
        }
        this.backPage = (e)=>{
            e.preventDefault();
            this.toTop(530);
            this.setState({
                ...this.state,
                pag: this.state.pag - 1
            })
        }
        this.onSubmit = (e)=>{
            e.preventDefault();
            this.toTop(530);
            if(document.getElementById("first-button")){
                document.getElementById("first-button").disabled = false;
            }
            if(document.getElementById("last-button")){
                document.getElementById("last-button").disabled = false;
            }
            if(document.getElementById("100")){
                document.getElementById("100").disabled = false;
            }
            if(document.getElementById("000")){
                document.getElementById("000").disabled = false;
            }
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
            this.toTop(0);
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
                recipe: false,
                filter: 'xxxx'
            })
        }

        this.back = (e)=>{
            e.preventDefault();
            this.toTop(530);
            this.setState({
                ...this.state,
                recipe: false
            })
        }
        this.backButton = ()=>{
            if(this.state.pag === 0){
                return true;
            }else{
                return false;
            }
        }
        this.nextButton = ()=>{
            let first = getFilter(this.state.filter, this.props.recipes);
            let results = getOrder(this.state.order, first);
            if(results.length <= ((this.state.pag + 1) * 9)){
                return true;
            }else{
                return false;
            }
        }
        this.toTop = (n)=>{
            window.scrollTo({
                top: n,
                behavior: 'smooth'
            });
        }
    }
    
    render() {
        let results = this.paginado();
        if(results[0] && !this.state.recipe){
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
                            <span className="filter-container">
                                <h5 className="sort">INCLUDES</h5>
                                <span><input type="checkbox" id="filter-vegetarian"/> Vegetarian</span>
                                <span><input type="checkbox" id="filter-vegan"/> Vegan</span>
                                <span><input type="checkbox" id="filter-glutenfree"/> Gluten free</span>
                                <span><input type="checkbox" id="filter-dairyfree"/> Dairy Free</span>
                                <br/>
                                <button onClick={()=>{
                                    this.toTop(530);
                                    setFilter(this)
                                    }}>Filter</button>
                            </span>
                            <span className="button-container">
                                <h5 className="sort">SORT BY</h5>
                                <button id="first-button" className="order-button" onClick={(e)=>{
                                    setOrder('AZ', this);
                                    document.getElementById("last-button").disabled = false;
                                    document.getElementById("100").disabled = false;
                                    document.getElementById("ZA").disabled = false;
                                    e.target.disabled = true;
                                    }}>A to Z</button>
                                <button id="ZA" className="order-button" onClick={(e)=>{
                                    setOrder('ZA', this);
                                    document.getElementById("first-button").disabled = false;
                                    document.getElementById("100").disabled = false;
                                    document.getElementById("last-button").disabled = false;
                                    e.target.disabled = true;
                                    }}>Z to A</button>
                                <button id="100" className="order-button" onClick={(e)=>{
                                    setOrder('100', this);
                                    document.getElementById("first-button").disabled = false;
                                    document.getElementById("last-button").disabled = false;
                                    document.getElementById("ZA").disabled = false;
                                    e.target.disabled = true;
                                    }}>Score MAX to MIN</button>
                                <button id="last-button" className="order-button" onClick={(e)=>{
                                    setOrder('000', this);
                                    document.getElementById("first-button").disabled = false;
                                    document.getElementById("100").disabled = false;
                                    document.getElementById("ZA").disabled = false;
                                    e.target.disabled = true;
                                    }}>Score MIN to MAX</button>
                            </span>
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
                        <button disabled={this.backButton()} className="button-page" onClick={this.backPage} id="botonBack">BACK</button>
                        <p className="page-number">{this.state.pag + 1}</p>
                        <button disabled={this.nextButton()} className="button-page" onClick={this.nextPage} id="botonNext">NEXT</button>
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
                            <button className="button-create" onClick={()=>{
                                document.getElementById("first-hButton").disabled = false;
                                document.getElementById("middle-hButton").disabled = false;
                                document.getElementById("last-hButton").disabled = true;
                            }}>Create it!</button>
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