import React,{Component} from 'react'
import Axios from 'axios'
import qs from 'qs'

let num=0;
let question=null;
let notrendered=0;

let LifeLine=['fifty','skip','know']
function getRndInteger(max) {
  return Math.floor(Math.random() * max);
}

export default class Quizzstart extends Component{
  state={
    currans:'',
    currques:null,
    correct:false,
    disable:true,
    easy:[],
    hard:[],
    medium:[],
    gamelevel:'',   //to be stored in mongo
    correctans:0,   //to be stored in mongo
    mcq:[],
    show:0,
    coins:0,
    fifty:false,
    skip:false,
    know:false      
  }

    componentDidMount(){

      //fetching easy level questions
       Axios({method:'post',url:'/api/questions',data: qs.stringify({
        difficulty:'easy'
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      
    }}).then(response=>{
      num=getRndInteger(21)
      this.setState({easy:response.data.uniqueTrivia,gamelevel:'easy',currques:response.data.uniqueTrivia[num]},()=>{
        notrendered=1;
      })    
    
    })
    //fetching medium level questions
    Axios({method:'post',url:'/api/questions',data: qs.stringify({
      difficulty:'medium'
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    
  }}).then(response=>{
    this.setState({medium:response.data.uniqueTrivia})    
  })

  //fetching hard level questions
  Axios({method:'post',url:'/api/questions',data: qs.stringify({
    difficulty:'hard'
  }),
  headers: {
    'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  
}}).then(response=>{
  this.setState({hard:response.data.uniqueTrivia})    
})
}

  

    render(){

      let corrindex=0;

      const getrandindex=(array)=>{                                                 //fucntion to get the correct option at some random index
      corrindex=getRndInteger(4)
     
      let temp=array[3];
      array[3]=array[corrindex];
      array[corrindex]=temp;
       
        return (array)
      }

        const nextQuestion=()=>{                                                    //calling for next question
          num=getRndInteger(21)
          console.log("random Index",num)
        if(this.state.gamelevel=='easy')                                                //current level is easy
          {
           if(this.state.correctans==20){
            this.setState({
              gamelevel:'medium',
              correctans:0,
              currques:this.state.medium[num],
              show:1
             })
              }
        else{
          
            this.setState({
              currques:this.state.easy[num],
              show:1         
              })        
          }
          }

        else if(this.state.gamelevel=='medium'){                                               //current level is medium
          if(this.state.correctans==20){

            this.setState({
              gamelevel:'hard',
              correctans:0,
              currques:this.state.hard[num]
            })          
          }
        else{
            this.setState({
              currques:this.state.medium[num],
              show:1
           })
        }
      }  

        else{                                                                                    //current level is hard
            if(this.state.correctans==20){                                                                                  //redirect to win page
            }
            else{
              this.setState({
                currques:this.state.hard[num],
                show:1         
            })
          }
        }
             
      }

        const checkanswer=(ans)=>{                                                 //checkanswer
          if(ans===this.state.currques.correct_answer){
              this.setState({correctans:this.state.correctans+1,show:0,currques:null,coins:this.state.coins+1},()=> {
                notrendered=0
               nextQuestion()
          })
        }
        }

      if(this.state.currques){
        console.log(this.state.currques,this.state.correctans)
        const mcq=getrandindex(this.state.currques.incorrect_answers.concat(this.state.currques.correct_answer))
        question=(                
            <div>
              <h5>{this.state.gamelevel}</h5>
              <p>Coins:{this.state.coins}</p>
          <p>{this.state.currques.question}</p>
          <br/>
            {
              mcq.map((opt,i)=>{return(
                <div>
                <p key={i} onClick={()=>checkanswer(opt)}> {opt} </p>
                
               </div>
              )})
    }
         </div>
        )
  }

  else{
    question=<h1>Quiz</h1>
  }
      return(
        <h1>
        
          {question}
        </h1>
      )
    }
  }