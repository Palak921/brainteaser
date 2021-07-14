
const onAuth = () => {
    return {
        type: 'ON_AUTH'
    }
}

 const onSetAuthRedirectPath = () => {
    return {
        type: 'ON_SET_AUTH_DIRECT_PATH'
    }
}

export{
    onAuth,
    onSetAuthRedirectPath
}