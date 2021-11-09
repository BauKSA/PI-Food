import {Link} from 'react-router-dom';
import img from '../imgs/HeLiaoDiao.jpg';
import './styles/home.css';

export default function Home(){
    return(
        <div className="main-home">
            <h2>WELCOME!</h2>
            <div className="home-container">
                <div className="homeImg-container">
                    <img className="home-img" src={img} alt="HeLiaoDiao"/>
                </div>
                <div className="homeInfo-container">
                    <span className="home-info">
                        <h4 className="home-title">Ok, soo... there I go!</h4>
                        <p>
                            After two weeks, I finally end my PI project for Henry... two long weeks. Or shorts, depends how you look it xD
                            In this, I want to show my skills using Js, React, Redux, HTML... and maybe CSS. For that, I create this food/recipes App,
                            where you can find thousands of recipes and filter them by diets, like "vegan", "vegetarian", etc.
                            And, if you cannot find an especific recipe... you can create it! 
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