import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Axios from 'axios'
import qs from 'qs'

import { CircularProgress } from '@material-ui/core';
import './Quizstart.css';

let num = 0;

function getRndInteger(min, max) {
  num = Math.floor(Math.random() * (max - min + 1)) + min;
}
getRndInteger(0, 3)
console.log(num)
export default class Quizzsatrt extends Component {

  state = {
    question: '',
    correct: '',
    number: 0,
    disable: true,
    answers: [],
    spinner: true
  }

  componentDidMount() {
    Axios({
      method: 'post', url: '/api/questions', data: qs.stringify({
        difficulty: 'hard'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'

      }
    }).then(response => {
      console.log(response)
      let ans = []
      let k = 0;
      ans[num] = response.data.correct
      for (var i in response.data.incorrect) {
        if (k !== num) {

          ans[k] = response.data.incorrect[i]
        }
        else {
          k += 1
          ans[k] = response.data.incorrect[i]
        }
        k += 1
      }
      this.setState({ question: response.data.question, correct: response.data.correct, answers: ans }, () => {
        console.log(this.state.answers)
        this.setState({ spinner: false })
      })
    })
  }

  render() {
    const checkanswer = (event, ans) => {
      event.preventDefault()
      if (ans == this.state.correct) {
        this.setState({ disable: false })
      }
    }
    let mcqdiv1 = null
    mcqdiv1 = this.state.answers.map((ans, i) => {
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
    mcqdiv2 = this.state.answers.map((ans, i) => {
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
            <h2>{this.state.question}</h2>
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
            <Button style={{ border: '1px solid #000' }} variant="contained" color="secondary" disabled={this.state.disable}>Next Question</Button>
          </div>
        </div>

      )
    }
  }
}