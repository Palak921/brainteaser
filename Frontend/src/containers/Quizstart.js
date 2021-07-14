import React,{Component} from 'react'
import Button from '@material-ui/core/Button';
import Axios from 'axios'
import qs from 'qs'


let num=0;

function getRndInteger(min, max) {
  num= Math.floor(Math.random() * (max - min + 1) ) + min;
}
getRndInteger(0,3)
console.log(num)
export default class Quizzsatrt extends Component{

  state={
    question:'',
    correct:'',
   number:0,
    disable:true,
    answers:[]
  }

    componentDidMount(){
        Axios({method:'post',url:'/api/questions',data: qs.stringify({
            difficulty:'hard'
          }),
          headers: {
            'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
          
        }}).then(response=>{console.log(response)
          let ans=[]
          let k=0;
          ans[num]=response.data.correct
            for(var i in response.data.incorrect){
              if(k!==num){
             
                ans[k]=response.data.incorrect[i]
              }
              else{
                k+=1
                ans[k]=response.data.incorrect[i]
              }
              k+=1
         }
          this.setState({question:response.data.question,correct:response.data.correct,answers:ans},()=>{
            console.log(this.state.answers)
            })
        })
    }
    
    render(){
  const checkanswer=(event,ans)=>{
     event.preventDefault()
     if (ans==this.state.correct){
       this.setState({disable:false})
     }
   }
     let mcqdiv=null
     mcqdiv=this.state.answers.map((ans,i)=>{return(<h1 key={i} onClick={(e)=>checkanswer(e,ans)}>{i+1} {ans}</h1>)})        //i+1:answer no in mcq  
      
        return(
         <div>
           <Button variant="contained" disabled={this.state.disable}>Default</Button>
           <h2>{this.state.question}</h2>
          {mcqdiv}
         </div>
    
        )
    }
}