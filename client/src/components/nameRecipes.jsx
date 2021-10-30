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
                this.setState({
                    ...this.state,
                    pag: this.state.pag + 1
                })
            }
        }
    }
    
    render() {
        console.log(this.paginado())
        let results = this.paginado();
        if(results[0]){
            return (
                <div>
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
                    <button onClick={this.nextPage} id="botonNext">NEXT</button>
                </div>    
            )
        }else{
            return(
                <div>
                    BUSCAR
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