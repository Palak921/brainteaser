import './App.css';
import Home from './Home';
import Quiz from './Containers/Quizstart'
import YouLost from './Components/YouLost';
import YouWin from './Components/YouWin'
import NotFound from './Components/NotFound'
import TimeOut from './Components/TimeOut'
import { Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact render={() => <Home />} />
        <Route path="/quiz" exact render={() => <Quiz />} />
        <Route path="/lost" exact render={() => <YouLost />} />
        <Route path='/timeout' exact render={() => <TimeOut />} />
        <Route path="/win" exact render={() => <YouWin />} />
        <Route path="*" exact render={() => <NotFound />} />
      </Switch >
    </div>


  );
}

export default App;
