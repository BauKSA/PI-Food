import React from "react";
import { Link } from 'react-router-dom';
import './styles/header.css';

class Header extends React.Component{
    constructor(props){
        super(props);

        this.onClick = (e)=>{
            document.getElementById("first-hButton").disabled = false;
            document.getElementById("middle-hButton").disabled = false;
            document.getElementById("last-hButton").disabled = false;
            e.disabled = true;
        }
    }


    render(){
        return(
            <div className="header-container">
                <div className="header-title">
                    <h1>HENRY'S FOOD APP</h1>
                </div>
                <div className="header-buttons-container">
                    <span className="header-buttons">
                        <Link to="/home">
                            <button id="first-hButton" className="hButton" onClick={()=>{
                                window.scrollTo({
                                    top: 530,
                                    behavior: 'smooth'
                                });
                                this.onClick(document.getElementById("first-hButton"));
                                }}>Home</button>
                        </Link>
                        <Link to="/search">
                            <button id="middle-hButton" className="hButton" onClick={this.onClick}>Search</button>
                        </Link>
                        <Link to="/addrecipe">
                            <button id="last-hButton" className="hButton" onClick={()=>{
                                window.scrollTo({
                                    top: 530,
                                    behavior: 'smooth'
                                });
                                this.onClick(document.getElementById("last-hButton"));
                                }}>Create recipe</button>
                        </Link>
                    </span>
                </div>
            </div>
        )
    }
}

export default Header;