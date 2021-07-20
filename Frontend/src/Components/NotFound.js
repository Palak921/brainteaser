import './LostWin.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function NotFound() {
    return (
        <div className="NotFound">
            <h1>Oops! 😲</h1>

            <p>
                You must have took the wrong path,
                Because I haven't able to lay my eye page you have been searching for
            </p>
            <Button variant="contained" color="primary">
                <Link to="/" style={{ color: 'white', textDecoration: ' none' }}>Go to Home </Link>
            </Button>
        </div>
    )
}