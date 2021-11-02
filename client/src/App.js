import './App.css';
import NameRecipes from './components/nameRecipes';
import { Switch, Route } from 'react-router-dom';
import PostRecipe from './components/postRecipe';
import Home from './components/Home';


function App() {
  return (
    <Switch>
      <Route path="/home">
        <div className="App">
          <Home/>
        </div>
      </Route>
      <Route path="/search/byname">
        <div className="App">
          <NameRecipes/>
        </div>
      </Route>
      <Route path="/search/bydiet">
        <div className="App">

        </div>
      </Route>
      <Route path="/diets">
        <div className="App">

        </div>
      </Route>
      <Route path="/addrecipe">
        <div className="App">
          <PostRecipe/>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
