import React from 'react'
import { connect } from 'react-redux'
import { searchByName } from "../store/actions"

class NameRecipes extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            search: ''
        }
    }
    
    render() {
        console.log(this.props)
        if(this.props.recipes){
        return <div>
            {this.props.recipes.map((recipe) => {
                return <div key={recipe.id}>
                    <h3>{recipe.name}</h3>
                    <img src={recipe.img} alt="" />
                </div>
            })}
        </div>
    }}
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