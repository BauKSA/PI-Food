import './App.css';
import NameRecipes from './components/nameRecipes';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route path="/home">
        <div className="App">
          HOME
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

        </div>
      </Route>
    </Switch>
  );
}

export default App;
