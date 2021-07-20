import React, { Component } from 'react'
import Axios from 'axios'
import qs from 'qs'
import { CircularProgress } from '@material-ui/core';
import './Quizstart.css';
import { withRouter } from 'react-router-dom'
import Countdown from 'react-countdown'
import { connect } from 'react-redux'

let num = 0;
let question = null;

function getRndInteger(max) {
  return Math.floor(Math.random() * max);                       // to get a random integer
}

class Quizzstart extends Component {
  state = {
    currans: '',
    currques: null,
    correct: false,
    disable: true,
    easy: [],
    hard: [],
    medium: [],
    gamelevel: '',                                                //to be stored in mongo
    correctans: 0,                                                 //to be stored in mongo
    show: 0,
    score: 0,
    spinner: true,
  }

  componentDidMount() {
    //fetching all easy level questions
    Axios({
      method: 'post', url: '/api/questions', data: qs.stringify({
        difficulty: 'easy'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(response => {
      num = getRndInteger(21)
      this.setState({
        easy: response.data.uniqueTrivia,
        gamelevel: 'easy',
        currques: response.data.uniqueTrivia[num]
      }, () => {
        this.setState({ spinner: false }, () => {
          this.timer = setInterval(() =>
            this.props.history.push('/timeout'), 60000);
        })
      })
    })
    //fetching medium level questions
    Axios({
      method: 'post', url: '/api/questions', data: qs.stringify({
        difficulty: 'medium'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(response => {
      this.setState({ medium: response.data.uniqueTrivia }, () => { this.setState({ spinner: false }) })
    })

    //fetching hard level questions
    Axios({
      method: 'post', url: '/api/questions', data: qs.stringify({
        difficulty: 'hard'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    }).then(response => {
      this.setState({ hard: response.data.uniqueTrivia }, () => { this.setState({ spinner: false }) })
    })


      Axios({
        method: 'post', url: '/api/userdb/fetchUserDetails', data: qs.stringify({
           username:this.props.username,
           password:this.props.password,
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'    
        }}).then(response=>{this.setState({score:response.data.score,correctans:response.data.ques,gamelevel:response.data.level})
      })
   
    }
        
  

  render() {
 
    let corrindex = 0;
    const resetData=()=>{
      Axios({
        method: 'post', url: '/api/userdb/userGameDetails', data: qs.stringify({
           username:this.props.username,
           password:this.props.password,
           score:0,
           level:'easy',
           ques:0
        }),
        headers: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8'    
        }}).then(response=>{
           console.log(response)
      })
    }

    const startTimer = (t) => {                                                    //to start a Timer everytime a new question is loaded on the screen
      this.timer = setInterval(() =>
        this.props.history.push('/timeout'), t);
      console.log(this.timer)
    }

    const stopTimer = () => {                                                      //stop the timer if user has clicked an option  
      clearInterval(this.timer)
      console.log(this.timer)
    }

    const getrandindex = (array) => {                                                //to randomize answer arrays                  
      corrindex = getRndInteger(4)
      let temp = array[3];
      array[3] = array[corrindex];
      array[corrindex] = temp;
      return (array)
    }

    const nextQuestion = () => {                                                     // to get next question if previous one was correct    
      num = getRndInteger(21)

      if (this.state.gamelevel === 'easy') {
        if (this.state.correctans === 20) {
          this.setState({
            gamelevel: 'medium',
            correctans: 0,
            currques: this.state.medium[num],
            show: 1
          }, () => startTimer(45000))
        }
        else {
          this.setState({
            currques: this.state.easy[num],
            show: 1
          }, () => startTimer(60000))
        }
      }

      else if (this.state.gamelevel === 'medium') {
        if (this.state.correctans === 20) {
          this.setState({
            gamelevel: 'hard',
            correctans: 0,
            currques: this.state.hard[num]
          }, () => startTimer(30000))
        }
        else {
          this.setState({
            currques: this.state.medium[num],
            show: 1
          }, () => startTimer(45000))
        }
      }

      else {
        if (this.state.correctans < 20) {
          this.setState({
            gamelevel: 'hard',
            correctans: 0,
            currques: this.state.hard[num]
          }, () => startTimer(30000))
        }
        else{
          resetData();
          this.props.history.push('/Win')
        }
      }
      this.setState({ correct: false })
    }

    const checkanswer = (ans) => {
      stopTimer()                                                                        //to check if the selected anwer is correct
      if (ans === this.state.currques.correct_answer) {
        
        this.setState({ correctans: this.state.correctans + 1, show: 0, currques: null, score: this.state.score + 1 }, () => {
          Axios({
            method: 'post', url: '/api/userdb/userGameDetails', data: qs.stringify({
              username: this.props.username,
              password: this.props.password,
              score: this.state.score,
              level: this.state.gamelevel,
              ques: this.state.correctans
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          }).then(response => {
            console.log(response)
          })
          nextQuestion()
        })
      }
        else{
           resetData();                                      //Reset mongo data if user loses
          this.props.history.push('/lost')                                                          //to redirect to lost page in case the selected answer is wrong
          console.log(this.props)    
        }
        }

        let mcqdiv1 = null                                                                         
        let mcqdiv2 = null

     

   

    if (this.state.currques) {
      const mcq = getrandindex(this.state.currques.incorrect_answers.concat(this.state.currques.correct_answer))

      mcqdiv1 = mcq.map((ans, i) => {
        if (i === 0 || i === 1) {
          return (
            <div className="option" onClick={() => checkanswer(ans)} key={i}>
              <p key={i} >
                {ans}
              </p>
            </div>)
        } else {
          return null
        }
      })
      //i+1:answer no in mcq  
      mcqdiv2 = mcq.map((ans, i) => {
        if (i === 2 || i === 3) {
          return (
            <div className="option" onClick={() => checkanswer(ans)} key={i}>
              <p key={i} >
                {ans}
              </p>
            </div>)
        } else {
          return null
        }
      })
      question = (
        <div>
          <p>{this.state.currques.question}</p>
        </div>
      )
    }
    else {
      question = <h1>Quiz</h1>
    }

    let time = 60000;
    if (this.state.gamelevel === 'medium') {
      time = 45000
    }
    else if (this.state.gamelevel === 'hard') {
      time = 30000
    }

    let countdown = Date.now() + time

    let lev = this.state.gamelevel.toString().substring(0, 1).toUpperCase() + this.state.gamelevel.toString().substring(1)

    if (this.state.spinner) {
      return <CircularProgress />
    }
    else {
      return (
        <div style={{width:'fit-content'}}>
          <div className="countdown">
            <p> <Countdown date={countdown} /></p>
          </div>
          <h1 className='headings'>{lev}</h1>

          <h2 className='headings'>Score :  {this.state.score}</h2>
          <div className="question">
            <h2>{question}</h2>
          </div>
          <div className="options">
            <div className="optionDiv" style={{  padding: '2%' }}>
              {mcqdiv1}
            </div>
            <div className="optionDiv" style={{  padding: '2%' }}>
              {mcqdiv2}
            </div >
          </div>
        </div>
      )
    }
  }
}


const mapStateToProps = state => {
  return {
    username: state.username,
    password: state.password,
    signup: state.signup,
    isAuthenticated: state.isAuthenticated
  };
};
export default withRouter(connect(mapStateToProps)(Quizzstart))