import './App.css';
import AllRecipes from './components/allRecipes';
import NameRecipes from './components/nameRecipes';
import { Switch, Route } from 'react-router-dom';
import Search from './components/search';

function App() {
  return (
    <Switch>
      <Route path="/home">
        <div className="App">
          <AllRecipes/>
        </div>
      </Route>
      <Route path="/search/byname">
        <div className="App">
          <Search/>
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
      <Route path="/recipe/information">
        <div className="App">

        </div>
      </Route>
      <Route path="/addrecipe">
        <div className="App">

        </div>
      </Route>
    </Switch>
  );
}

export default App;
