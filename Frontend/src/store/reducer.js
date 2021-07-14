import * as actions from './actions';

const initialState = {
    userName: '',
    password: '',
    path: '',
    isAuthenticated: true
}

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case 'ON_AUTH': {

        }
        case 'ON_SET_AUTH_DIRECT_PATH': {
            return { ...initialState, path: '/' }
        }

        default: return state;
    }
}

export default reducer;