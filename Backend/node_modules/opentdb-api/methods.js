exports.getTriviaCategoryID = function(category, maxCategory){
    if(parseInt(category) >= 9 && parseInt(category) <= maxCategory){
        return category;
    }

    switch(category){
        case 'any': return '';
        case 'general': return 9;
        case 'books': return 10;
        case 'film': return 11;
        case 'music': return 12;
        case 'theatre': return 13;
        case 'television': return 14;
        case 'videogames': return 15;
        case 'boardgames': return 16;
        case 'science': return 17;
        case 'computers': return 18;
        case 'mathematics':
        case 'math': return 19;
        case 'mythology': return 20;
        case 'sports': return 21;
        case 'geography': return 22;
        case 'history': return 23;
        case 'politics': return 24;
        case 'art': return 25;
        case 'celebrities': return 26;
        case 'animals': return 27;
        case 'vehicles': return 28;
        case 'comics': return 29;
        case 'gadgets': return 30;
        case 'anime': return 31;
        case 'cartoons': return 32;
        
        default: throw new Error('Cannot find specified category');
    }
}

exports.getTriviaType = function(type){
    switch(type){
        case 'any': return '';
        case 'choice':
        case 'multiple': return 'multiple';
        case 'truefalse':
        case 'boolean': return 'boolean';
        
        default: throw new Error(type + ' is not a valid type. Type must either be multiple (multiple choice), or boolean (true/false)');
    }
}

exports.getTriviaDifficulty = function(difficulty){
    switch(difficulty){
        case 'any': return '';
        case 'easy': return 'easy';
        case 'medium': return 'medium';
        case 'hard': return 'hard';
        
        default: throw new Error(difficulty + ' is not a valid difficulty. Difficulty must either be easy, medium, or hard');
    }
}

exports.getTriviaAmount = function(amount){
    if(typeof amount !== 'number' || amount < 1 || amount > 50){
        throw new Error('Amount must be a value between 1 and 50');
    }
    else{
        return amount;
    }
}

exports.getTriviaReponseError = function(code){
    switch(code){
        case 1: return "The API doesn't have enough questions for your query.";
        case 2: return "Invalid parameter(s). Arguments passed aren't valid.";
        case 3: return "Invalid session token.";
        case 4: return "Session token has retrieved all possible questions for the specified query. Reset the token.";

        default: return "An error has occured in the API";
    }
}