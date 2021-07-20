import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from './Input';
// import Button from '../../components/UI/Button/Button';
import { Button } from '@material-ui/core';
// import Spinner from '../../components/UI/Spinner/Spinner';
import './Auth.css';
import * as actions from '../store/index';
import Axios from 'axios'

import { updateObject, checkValidity } from '../store/utility';
import qs from 'qs';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true,
        submit: false,
        error: false
    }

    componentDidMount() {
        // console.log(classes.Auth);
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    inputChangedHandler = (event, controlName) => {
        // console.log(event.target.value)
        // console.log(controlName)
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        this.setState({ controls: updatedControls });
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup };
        });
    }

    render() {
            const formElementsArray = [];
            for (let key in this.state.controls) {
                formElementsArray.push({
                    id: key,
                    config: this.state.controls[key]
                });
            }

            let form = formElementsArray.map(formElement => (
                <Input
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            )
            );

            if (this.props.loading) {
                // form = <Spinner />
            }



            if (this.props.isAuthenticated) {
                // authRedirect = <Redirect to={this.props.authRedirectPath} />
            }

            const submitHandler = () => {
                this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
            }


           
            const signInHandler = (event) => {
                event.preventDefault();
                submitHandler();
                Axios({
                    method: 'post', url: '/api/userdb/signin', data: qs.stringify({
                        username: this.state.controls.email.value,
                        password: this.state.controls.password.value
                    })
                }).then(response => {
                    if (response.data === 'No data found') {
                        console.log(response.data)
                        this.setState({ error: true })

                    }
                    else {
                        this.setState({ submit: true,error:false })
                        this.props.onAuthenticated(true)

                    }
                })
            }

            const signUpHandler = (event) => {
                event.preventDefault();
                
                
                Axios({
                    method: 'post', url: '/api/userdb/signUp', data: qs.stringify({
                        username: this.state.controls.email.value,
                        password: this.state.controls.password.value
                    })
                }).then(response => {
                    
                    if(response.data==='Already Exists'){
                        console.log(response)
                        this.setState({error:true})
                    }
                    else{
                        submitHandler();
                        this.setState({submit:true,error:false})
                        this.props.onAuthenticated(true)
                    }
                    console.log(response)
                }
                )
            }

            let button = <Button color="primary" variant="contained" onClick={(e) => signInHandler(e)}>SIGN IN</Button>

            if (this.state.isSignup) {
                button = <Button color="primary" variant="contained" onClick={(e) => signUpHandler(e)}>SIGN UP</Button>
            }
            return (
                <div className="Auth">
                    <h3>Welcome to our quiz App</h3>
                    <h5>Register yourself or Sign in to proceed!</h5>
                    {this.state.submit ? <Redirect to="/quiz" /> : null}
                    {this.state.error && !this.state.isSignup ?<p>Incorrect Credentials, try Again or Sign Up</p> : null}
                    {this.state.error && this.state.isSignup ?<p>Username already exists</p> : null}


                    <form>
                        {form}
                        {button}
                        <Button
                            variant={this.state.isSignup ? "contained" : "outlined"}
                            color="secondary"
                            onClick={this.switchAuthModeHandler}
                            style={{ margin: '2%' }}>SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
                    </form>
                </div>
            );
        }
    }


const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuthenticated,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, password, signUp) => dispatch(actions.onAuth(username, password, signUp)),
        onSetAuthRedirectPath: () => dispatch(actions.onSetAuthRedirectPath('/')),
        onAuthenticated: () => dispatch(actions.onAuthenticated(true))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
// export default Auth;