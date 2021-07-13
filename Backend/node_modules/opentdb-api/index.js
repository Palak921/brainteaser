const axios   = require('axios');
const methods = require('./methods.js');;

/**
 * Retrieves random trivia from the Open Trivia DB
 * @param {{amount: Number, difficulty: String, category: String, type: String, token: String}} options Options to get trivia questions with. amount: integer amount of questions to retrieve. difficulty: easy, medium, or hard. category: category of questions. type: multiple or boolean. token: session token to prevent duplicate trivia.
 * @returns {Promise<JSON>}
 */
exports.getTrivia = async function (options = {}){
    var amount     = options.amount !== undefined ? options.amount : 1;
    var difficulty = options.difficulty !== undefined ? options.difficulty : 'medium';
    var category   = options.category !== undefined ? options.category : 'any';
    var type       = options.type !== undefined ? options.type : 'multiple';
    var token      = options.token !== undefined ? options.token : '';

    return new Promise(async (resolve, reject) => {
        try{
            const maxCategories = await axios.get('https://opentdb.com/api_category.php');
            const cateID      = methods.getTriviaCategoryID(category, maxCategories.data.trivia_categories[maxCategories.data.trivia_categories.length - 1].id);
            const pamount     = methods.getTriviaAmount(amount);
            const ptype       = methods.getTriviaType(type);
            const pdifficulty = methods.getTriviaDifficulty(difficulty);

            var finalParams = {
                amount: pamount
            }

            if(cateID !== ''){
                finalParams.category = cateID
            }
            if(pdifficulty !== ''){
                finalParams.difficulty = pdifficulty
            }
            if(ptype !== ''){
                finalParams.type = ptype
            }
            if(token !== ''){
                finalParams.token = token
            }
            
            const result = await axios.get('https://opentdb.com/api.php', {
                params: finalParams
            });

            if(result.data.response_code !== 0){
                reject(new Error('Response code ' + result.data.response_code + ': ' + methods.getReponseError(result.data.response_code)));
            }
            else{
                var filteredResult = JSON.parse(JSON.stringify(result.data.results)
                .replace(/&quot;/g, '\\"')
                .replace(/&#039;/g, "'")
                .replace(/&amp;/g, '&')
                .replace(/&acute;/g, '`')
                .replace(/&eacute;/g, 'é')
                .replace(/&oacute;/g, 'ó')
                .replace(/&pound;/g, '£')
                .replace(/&aacute;/g, 'á')
                .replace(/&Aacute;/g, 'Á')
                .replace(/&ntilde;/g, 'ñ')
                .replace(/&rdquo;/g, '\\"')
                .replace(/&ouml;/g, 'ö')
                );
                resolve(filteredResult);
            }

        }
        catch(err){
            reject(err);
        }
    });
}


/**
 * Retrieves a session token
 * @returns {Promise<String>} Token
 */
exports.getToken  = async function(){
    return new Promise(async (resolve, reject) => {
        try{
            const result = await axios.get('https://opentdb.com/api_token.php?command=request');

            if(result.data.response_code !== 0){
                reject(new Error('Response code ' + result.data.response_code + ': ' + result.data.response_message));
            }
            else{
                resolve(result.data.token);
            }
        }
        catch(err){
            reject(err);
        }
    })
}


/**
 * Resets a session token
 * @param {String} token Token to reset session for.
 * @returns {Promise<Boolean>} Success
 */
exports.resetToken = async function(token){
    const result = await axios.get(`https://opentdb.com/api_token.php?command=reset&token=${token}`)

    if(result.data.response_code !== 0){
        return false;
    }
    else{
        return true;
    }
}


/**
 * Returns all categories along with their ID
 * @returns {Promise<Object>}
 */
exports.getCategories = async function(){
    const results = await axios.get('https://opentdb.com/api_category.php');

    return results.data.trivia_categories;
}


/**
 * Returns the total question account for a category
 * @param {String} category Category to get count for.
 * @returns {Promse<Object>}
 */
exports.getQuestionCount = function(category){
    return new Promise(async (resolve, reject) => {
        try{
            const maxCategories = await axios.get('https://opentdb.com/api_category.php');
            const cateID        = methods.getTriviaCategoryID(category, maxCategories.data.trivia_categories[maxCategories.data.trivia_categories.length - 1].id);

            const questionCount = await axios.get(`https://opentdb.com/api_count.php?category=${cateID}`);

            resolve(questionCount.data.category_question_count);
        }
        catch(err){
            reject(err);
        }
    });
}