import React,{Component} from 'react'
import Axios from 'axios'
import qs from 'qs'
export default class Quizzsatrt extends Component{
    componentDidMount(){
        Axios({method:'post',url:'/api/questions',data: qs.stringify({
            difficulty:'hard'
          }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          }
        }).then(response=>console.log(response))
    }

    render(){
        return(
     <h1>Quiz</h1>
        )
    }
}