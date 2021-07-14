const express = require('express')
const opentdb = require('opentdb-api');

const router = express.Router()
router.post('/questions', (req, res) => {
  try {
    const difficulty = req.body.difficulty;
    console.log(difficulty)
    opentdb.getToken().then(newToken => {
      let num = 0;
      function getRndInteger(min, max) {
        num = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      getRndInteger(6000, 6900)
      console.log(num)
      var options = {
        amount: 1,
        categoryID: num.toString(),
        difficulty: difficulty,
        type: 'multiple',
        token: newToken
      }

      opentdb.getTrivia(options).then(uniqueTrivia => {

        res.send(uniqueTrivia)
        console.log('done')
      });
      res.status(200)
    });

  }
  catch (error) {
    console.log(error)
    res.status(404).send({ error })
  }
});


module.exports = router