import * as actiontypes from './actionTypes'

const initialState = {
    username: '',
    password: '',
    path: '',
    signup:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actiontypes.ON_AUTH: 
        return{
            ...initialState,
             username:action.username,
             password:action.password,
             signup:action.signup
           }          
           
        case 'ON_SET_AUTH_DIRECT_PATH': 
        return{
             ...initialState, 
             path: '/' 
            }
        
        default: return state;
    }
}

export default reducer;