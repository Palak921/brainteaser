import './App.css';
import Quizzsatrt from './Containers/Quizstart';
import Home from './Home';
import Quiz from './Containers/Quizstart'

import { Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        {/* QuizApp */}
        <Route path="/" exact render={() => <Home />} />
        <Route path="/quiz" exact render={() => <Quiz />} />
        {/* // <Quiz /> */}
        {/* <Home /> */}
      {/* </header> */}
    </div>
  );
}

export default App;
