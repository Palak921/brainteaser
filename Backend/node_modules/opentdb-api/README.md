## About
Easily retrieve random trivia questions using the [Open Trivia DB API.](https://opentdb.com/)

## Usage
```js
const opentdb = require('opentdb-api');

var options = {
    amount: 2,
    category: 'science',
    difficulty: 'easy',
    type: 'multiple'
}

opentdb.getTrivia(options).then(result => {
  console.log(result);
});
// =>[ { category: 'Science & Nature',
// =>    type: 'multiple',
// =>    difficulty: 'easy',
// =>    question: 'Alzheimer\'s disease primarily affects which part of the human body?',
// =>    correct_answer: 'Brain',
// =>    incorrect_answers: [ 'Lungs', 'Skin', 'Heart' ] },
// =>  { category: 'Science & Nature',
// =>    type: 'multiple',
// =>    difficulty: 'easy',
// =>    question: 'What animal takes part in Schrödinger\'s most famous thought experiment?',
// =>    correct_answer: 'Cat',
// =>    incorrect_answers: [ 'Dog', 'Bat', 'Butterfly' ] } ]
```

## Examples of using a token to prevent duplicates
### Using async/await
```js
const opentdb = require('opentdb-api');

const newToken = await opentdb.getToken();

var options = {
    amount: 2,
    category: 'science',
    difficulty: 'easy',
    type: 'multiple',
    token: newToken
}

const uniqueTrivia = await opentdb.getTrivia(options);

console.log(uniqueTrivia);
```
### Using .then
```js
const opentdb = require('opentdb-api');

opentdb.getToken().then(newToken => {

  var options = {
      amount: 2,
      category: 'science',
      difficulty: 'easy',
      type: 'multiple',
      token: newToken
  }

  opentdb.getTrivia(options).then(uniqueTrivia => {
    console.log(uniqueTrivia);
  });
});
```
## Functions

### `getTrivia(options)`
#### Retrieves random trivia.
#### options
* amount - Amount of questions to retrieve
* difficulty - Difficulty of questions (easy/medium/hard)
* category - Category string or ID. Possible strings can be found below. Possible IDs can be found on the OpenTriviaDB website.
* type - Type of questions to retrieve (multiple or boolean). multiple - Multiple choice. boolean - True/False questions.
* token - Token to request questions with. Tokens prevent the API from sending the same question twice. Use the getToken() function to retrieve a token.

### `getToken()`
#### Returns promise with a new session token. 
Token can be used to prevent duplicate questions when using the getTrivia() function.

### `resetToken(token)`
#### Resolves into boolean value if reset was successful or not.
Resets the memory for a given token. Can be used once a token has queried all possible questions.

### `getCategories()`
#### Returns promise with all categories in the api and their respective IDs

### `getQuestionCount(category)`
#### Returns promise with total amount of questions for a given category. Possible category can be an ID or string found below.

## Possible categories
`any`
`general`
`books`
`film`
`music`
`theatre`
`television`
`videogames`
`boardgames`
`science`
`computers`
`mathematics`
`mythology`
`sports`
`geography`
`history`
`politics`
`art`
`celebrities`
`animals`
`vehicles`
`comics`
`gadgets`
`anime`
`cartoons`
<br/>You can also just use the ID of the category found on their website