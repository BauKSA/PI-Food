import {Link} from 'react-router-dom';
import img from '../imgs/recipeIcon.png';
import './styles/home.css';

export default function Home(){
    return(
        <div className="main-home">
            <h2>WELCOME!</h2>
            <div className="home-container">
                <div className="homeImg-container">
                    <img className="home-img" src={img} alt="recipeIcon"/>
                </div>
                <div className="homeInfo-container">
                    <span className="home-info">
                        <h4 className="home-title">Ok, soo... Here I come!</h4>
                        <p>
                            After two weeks, I finally finished my PI project for Henry... two long weeks. Or short, depending of how You look at it xD
                            In this site, I want to show my skills using Js, React, Redux, HTML... and maybe CSS. That's why I created this food/recipes App,
                            where you can find thousands of recipes and filter them by diets, like "vegan", "vegetarian", etc.
                            And, if you can't find a specific recipe... you can upload your own!
                            So, end presentations and start with the app... maybe searching for some recipes??
                        </p>
                        <Link to="/search">
                            <button className="home-sButton" onClick={
                                (e)=>{
                                    document.getElementById("first-hButton").disabled = false;
                                    document.getElementById("middle-hButton").disabled = true;
                                    document.getElementById("last-hButton").disabled = false;
                                }
                            }>Search recipes!!</button>
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}