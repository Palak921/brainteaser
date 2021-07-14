import React from 'react';
import Countdown from 'react-countdown';
 


export default Timer=(props)=>{

  const Completionist = () => <span>You are good to go!</span>;
const Lost=<h1>You lost</h1>
 

  const renderer = ({ completed }) => {   // Renderer callback with condition
    if (completed && props.correct) {
      return <Completionist />;
    } else {
      return <Lost/>
    }
  };
  

 return(
  <Countdown
    date={Date.now() + 5000}
    renderer={renderer}
  />
 )
}

