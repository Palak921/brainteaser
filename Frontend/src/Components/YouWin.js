import './LostWin.css';
import Win from '../images/Win.jpg';
import { Button } from '@material-ui/core'
import { Redirect } from 'react-router';
import { useState } from 'react';

export default function YouWin() {
    const [redirect, setRedirect] = useState(null)
    const exitHandler = () => {
        setRedirect(<Redirect to="/" />)
    }

    const newGameHandler = () => {
        setRedirect(<Redirect to="/quiz" />)
    }

    return (
        <div className="Win">
            <h1 class="winHeading">Wohoo! You mastered this game</h1>
            {/* <h2 style={{ color: 'black' }}>Better Luck Next Time</h2> */}
            <div class="SadImage">
                <img class="winImage" src={Win} alt="Sad"/>
            </div>
            <Button variant="contained" color="primary" style={{ margin: '5%' }} onClick={newGameHandler}>New Game</Button>
            {redirect}
            <Button variant="contained" color="secondary" style={{ margin: '5%' }} onClick={exitHandler}>Exit Game</Button>
        </div>
    )
}