import './LostWin.css';
import Sad from '../images/Sad.jpg';
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

export default function YouLost() {
    return (
        <div className="Lost">

            <h1 className="lostHeading">Oops!   Wrong Answer</h1>
            <h1 className="lostHeading">You Lost</h1>
            <h2 className="lostHeading2">Better Luck Next Time</h2>
            <Button variant="contained" color="secondary" style={{ margin: '2%' }}>
                <Link to="/quiz" style={{ color: 'white', textDecoration: ' none' }}>Start a New Game</Link>
            </Button>
            <Button variant="contained" color="primary" style={{ margin: '2%' }}>
                <Link to="/" style={{ color: 'white', textDecoration: ' none' }}>Exit</Link>
            </Button>
            <div className="SadImage">
                <img src={Sad} alt="Sad" />
            </div>
        </div>
    )
}