import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Axios from 'axios'
import qs from 'qs'

import { CircularProgress } from '@material-ui/core';
import './Quizstart.css';

let num = 0;
let question = null;

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
num = getRndInteger(0, 21)
const level = ['easy', 'medium', 'hard']
export default class Quizzstart extends Component {

  state = {
    currans: '',
    correct: false,
    disable: true,
    easy: [],
    hard: [],
    medium: [],
    gamelevel: '',   //to be stored in mongo
    correctans: 0,   //to be stored in mongo
    mcqs: [],
    spinner: true
  }

  componentDidMount() {
    Axios({
      method: 'post', url: '/api/questions', data: qs.stringify({
        difficulty: 'easy'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'

      }
    }).then(response => {
      // console.log(num)
      console.log(response)
      this.setState({
        easy: response.data.uniqueTrivia, gamelevel: 'easy',
        currans: response.data.uniqueTrivia[num].correct_answer,
        mcqs: response.data.uniqueTrivia[num].incorrect_answers.concat(response.data.uniqueTrivia[num].correct_answer)
      },
        () => {
          this.setState({ spinner: false })
          console.log(this.state.mcqs)
          question = (
            <div>
              <p>{this.state.easy[num].question}</p>
              <br />
              {/* {
                this.state.mcqs.map((opt, i) => {
                  return (
                    <div>
                      <p key={i}> {opt} </p>

                    </div>
                  )
                })
              } */}
            </div>
          )
        })
    })

    Axios({
      method: 'post', url: '/api/questions', data: qs.stringify({
        difficulty: 'medium'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'

      }
    }).then(response => {
      console.log(response)
      this.setState({ medium: response.data.uniqueTrivia }, () => {
        this.setState({ spinner: false })
        console.log(this.state.medium)
      })
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
      console.log(response)
      this.setState({ hard: response.data.uniqueTrivia }, () => { console.log(this.state.hard) })
    })

  }

  render() {
    const getrandindex = (array) => {                                                 //fucntion to get the correct option at some random index
      let corrindex = getRndInteger(0, 3)
      [array[3], array[corrindex]] = [array[corrindex], array[3]]
      console.log(array)
    }

    const nextLevel = (event) => {                                                    //calling for next question
      event.preventdefault()

      if (this.state.gamelevel == 'easy')                                                //current level is easy
      {
        if (this.state.correctans == 20) {
          this.setState({
            gamelevel: 'medium',
            correctans: 0,
            mcqs: this.state.medium[num].incorrect_answers.concat(this.state.medium[num].correct_answer),
            currans: this.state.medium[num].correct_answer
          },
            () => {
              getrandindex(this.state.mcqs)
              question = (
                <div>
                  <p>{this.state.medium[num].question}</p>
                  <br />
                  {
                    this.state.mcqs.map((opt, i) => {
                      return (
                        <div>
                          <p key={i}> {opt} </p>

                        </div>
                      )
                    })
                  }
                </div>
              )
            })
        }
        else {
          this.setState({
            currans: this.state.easy[num].correct_answer,
            mcqs: this.state.easy[num].incorrect_answers.concat(this.state.easy[num].correct_answer)
          },
            () => {
              getrandindex(this.state.mcqs)
              question = (
                <div>
                  <p>{this.state.easy[num].question}</p>
                  <br />
                  {
                    this.state.mcqs.map((opt, i) => {
                      return (
                        <div>
                          <p key={i}> {opt} </p>

                        </div>
                      )
                    })
                  }
                </div>
              )
            })
        }
      }

      else if (this.state.gamelevel == 'medium') {                                               //current level is medium
        if (this.state.correctans == 20) {
          this.setState({
            gamelevel: 'hard',
            correctans: 0,
            currans: this.state.hard[num].correct_answer,
            mcqs: this.state.hard[num].incorrect_answers.concat(this.state.hard[num].correct_answer)
          },
            () => {
              getrandindex(this.state.mcqs)
              question = (
                <div>
                  <p>{this.state.hard[num].question}</p>
                  <br />
                  {/* {
                    this.state.mcqs.map((opt, i) => {
                      return (
                        <div>
                          <p key={i}> {opt} </p>

                        </div>
                      )
                    })
                  } */}
                </div>
              )
            })
        }
        else {
          this.setState({
            currans: this.state.medium[num].correct_answer,
            mcqs: this.state.medium[num].incorrect_answers.concat(this.state.medium[num].correct_answer)
          },
            () => {
              getrandindex(this.state.mcqs)
              question = (
                <div>
                  <p>{this.state.medium[num].question}</p>
                  <br />
                  {/* {
                    this.state.mcqs.map((opt, i) => {
                      return (
                        <div>
                          <p key={i}> {opt} </p>

                        </div>
                      )
                    })
                  } */}
                </div>
              )
            }
          )
        }
      }

      else {                                                                                    //current level is hard
        if (this.state.correctans == 20) {                                                                                  //redirect to win page
        }
        else {
          this.setState({
            currans: this.state.hard[num].correct_answer,
            mcqs: this.state.hard[num].incorrect_answers.concat(this.state.hard[num].correct_answer)
          },
            () => {
              getrandindex(this.state.mcqs)
              question = (
                <div>
                  <p>{this.state.hard[num].question}</p>
                  <br />
                  {/* {
                    this.state.mcqs.map((opt, i) => {
                      return (
                        <div>
                          <p key={i}> {opt} </p>

                        </div>
                      )
                    })
                  } */}
                </div>
              )
            })
        }
      }
      this.setState({ correct: false })
    }

    const checkanswer = (event, ans) => {                                                 //checkanswer
      // event.preventdefault();
      console.log(event)
      if (ans === this.state.currans) {
        this.setState({ correctans: this.state.correctans + 1, correct: true , disabled:false })
      }
    }


    let mcqdiv1 = null
    mcqdiv1 = this.state.mcqs.map((ans, i) => {
      if (i == 0 || i == 1) {
        return (
          <div class="option" onClick={(e) => checkanswer(e, ans)}>
            <p key={i} >
              {ans}
            </p>
          </div>)
      } else {
        return null
      }
    })
    //i+1:answer no in mcq  

    let mcqdiv2 = null
    mcqdiv2 = this.state.mcqs.map((ans, i) => {
      if (i == 2 || i == 3) {
        return (
          <div class="option" onClick={(e) => checkanswer(e, ans)}>
            <p key={i} >
              {ans}
            </p>
          </div>)
      } else {
        return null
      }
    })

    if (this.state.spinner) {
      return <CircularProgress />
    } else {

      return (
        <div style={{ width: '50%' }}>
          <div class="question">
            <h2>{question}</h2>
          </div>


          <div class="options">
            <div style={{ display: 'flex', flexDirection: 'coloumn', padding: '2%' }}>
              {mcqdiv1}
            </div>
            <div style={{ display: 'flex', flexDirection: 'coloumn', padding: '2%' }}>
              {mcqdiv2}
            </div >
          </div>
          <div style={{ margin: '2%' }}>
            <Button style={{ border: '1px solid #000' }} variant="contained" color="secondary" disabled={!this.state.correct}>Next Question</Button>
          </div>
        </div>

      )
    }
  }
}
