
const onAuth = (username,password,signup) => {
    return {
        type: 'ON_AUTH',
        username:username,
        password:password,
        signup:signup
    }
}

 const onSetAuthRedirectPath = () => {
    return {
        type: 'ON_SET_AUTH_DIRECT_PATH'
    }
}

const onAuthenticated = () =>{
    return{
        type:'ON_AUTHENTICATED'
    }
}

export{
    onAuth,
    onSetAuthRedirectPath,
    onAuthenticated
}