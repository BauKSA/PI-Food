import './App.css';
import NameRecipes from './components/nameRecipes';
import { Switch, Route } from 'react-router-dom';
import PostRecipe from './components/postRecipe';
import Home from './components/Home';


function App() {
  return (
    <Switch>
      <Route exact path="/home">
        <div className="App">
          <Home/>
        </div>
      </Route>
      <Route exact path="/search">
        <div className="App">
          <NameRecipes/>
        </div>
      </Route>
      <Route exact path="/addrecipe">
        <div className="App">
          <PostRecipe/>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
