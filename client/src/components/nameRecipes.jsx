import React from 'react'
import { connect } from 'react-redux'
import { searchByName } from "../store/actions"

class NameRecipes extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: '',
            pag: 0,
            recipes: [],
            order: '',
        };
        this.paginado = ()=>{
                if(this.props.recipes){
                    let results = this.props.recipes;
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
        this.aToZ = (e)=>{
            if(e){
                e.preventDefault();
            }
            if(this.props.recipes){
                let results = this.props.recipes;
                results.sort((a, b)=>{
                    if (a.name > b.name) {
                        return 1;
                      }
                      if (a.name < b.name) {
                        return -1;
                      }
                      return 0;
                })
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
        this.zToA = (e)=>{
            if(e){
                e.preventDefault();
            }
            if(this.props.recipes){
                let results = this.props.recipes;
                results.sort((a, b)=>{
                    if (a.name > b.name) {
                        return -1;
                      }
                      if (a.name < b.name) {
                        return 1;
                      }
                      return 0;
                })
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
        this.onSubmit = (e)=>{
            e.preventDefault();
            this.props.searchByName(this.state.search);
            setTimeout(()=>{
                this.reset();
            }, 500)
        }
        this.onInputChange = (e)=>{
            this.setState({
                ...this.state,
                search: e.target.value
            })
        }
        this.setOrder = function(or){
            this.setState({
                ...this.state,
                order: or
            })
        }
        this.reset = ()=>{
            this.setState({
                ...this.state,
                pag: 0,
                order: ''
            })
        }
    }
    
    render() {
        switch(this.state.order){
            case 'AZ':
                var results = this.aToZ();
                break;
            case 'ZA':
                var results = this.zToA();
            default:
                var results = this.paginado();
        }
        if(results[0]){
            return (
                <div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" value={this.state.search} onChange={this.onInputChange}/>
                            <button id="botonSearch">SEARCH</button>
                        </form>
                    </div>
                    <div>
                        <button onClick={()=>{this.setOrder('AZ')}}>A to Z</button>
                        <button onClick={()=>{this.setOrder('ZA')}}>Z to A</button>
                    </div>
                    <div>
                        {
                            results.map((result)=>{
                                return(
                                    <div key={result.id}>
                                        <h3>{result.name}</h3>
                                        <img src={result.img}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button onClick={this.backPage} id="botonBack">BACK</button>
                    <button onClick={this.nextPage} id="botonNext">NEXT</button>
                </div>    
            )
        }else{
            return(
                <div>
                    <div>
                        <form onSubmit={this.onSubmit}>
                            <input type="text" value={this.state.search} onChange={this.onInputChange}/>
                            <button id="botonSearch">SEARCH</button>
                        </form>
                    </div>
                    <div>
                        BUSCAR
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
    searchByName
}
const conexion = connect(mapStateToProps, mapDispatchToProps)
export default  conexion(NameRecipes);