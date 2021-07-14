const express = require('express')
const opentdb = require('opentdb-api');

const router = express.Router()
router.post('/questions', (req, res) => {
  try {
    const difficulty = req.body.difficulty;
    console.log(difficulty)
    opentdb.getToken().then(newToken => {
         let num=0;
        function getRndInteger(min, max) {
            num= Math.floor(Math.random() * (max - min + 1) ) + min;
          }
          getRndInteger(6000,6900)
     console.log(num)
        var options = {
            amount: 21,
            categoryID: num.toString(),
           difficulty:difficulty,
            type: 'multiple',
            token: newToken
        }
       
        opentdb.getTrivia(options).then(uniqueTrivia => {
          console.log(uniqueTrivia)
          res.status(200).send({uniqueTrivia/*question:uniqueTrivia[0].question,correct:uniqueTrivia[0].correct_answer,incorrect:uniqueTrivia[0].incorrect_answers*/})
          console.log('done')
        });
      })
     

  }
  catch (error) {
    console.log(error)
    res.status(404).send({ error })
  }
});


module.exports = router