import './LostWin.css';
import Sad from '../images/Sad.jpg';

export default function YouLost() {
    return (
        <div className="Lost">          
            <h1 className="lostHeading">Oops!   Time Out</h1>
            {/* <h1 className="lostHeading2">You Lost</h1> */}
            <h2 className="lostHeading2">Better Luck Next Time</h2>
            <div class="SadImage">
                <img src={Sad} alt="imageSad"/>
            </div>
        </div>
    )
}