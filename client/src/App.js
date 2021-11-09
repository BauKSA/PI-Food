import './App.css';
import NameRecipes from './components/nameRecipes';
import { Switch, Route } from 'react-router-dom';
import PostRecipe from './components/postRecipe';
import Home from './components/Home';
import Header from './components/Header';


function App() {
  return (
    <Switch>
       <Route exact path="/">
        <div className="App">
          <Header/>
          <img src="https://image.flaticon.com/icons/png/512/100/100417.png" width="200" alt="home-image"/>
        </div>
      </Route>
      <Route exact path="/home">
        <div className="App">
          <Header/>
          <Home/>
        </div>
      </Route>
      <Route exact path="/search">
        <div className="App">
          <Header/>
          <NameRecipes/>
        </div>
      </Route>
      <Route exact path="/addrecipe">
        <div className="App">
          <Header/>
          <PostRecipe/>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
