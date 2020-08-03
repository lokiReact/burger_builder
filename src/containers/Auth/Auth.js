import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '.././../components/UI/Input/Input';
import Button from '.././../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {checkValidity} from '../../shared/utility' 

class Auth extends Component {
    state = {
        controls: {
            email: {
                value: '',
                label: 'Email',
                elType: 'input',
                elConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            password: {
                value: '',
                label: 'Password',
                elType: 'input',
                elConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                valid: false,
                validation: {
                    required: true,
                    minLength: 7
                },
                touched: false
            }
        },
        isSignUp: false
    }

    inputChangedHandler = (event, el) => {
        const updatedControls = {
            ...this.state.controls,
            [el]: {
                ...this.state.controls[el],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, this.state.controls[el].validation)
            }
        }
        this.setState({ controls: updatedControls })
    }

    formHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    switchSignupHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }


    render() {
        const elArray = [];

        for (let key in this.state.controls) {
            elArray.push({ id: key, config: this.state.controls[key] })
        }

        const elements = elArray.map(el =>
            <Input
                key={el.id}
                elType={el.config.elType}
                label={el.config.label}
                elConfig={el.config.elConfig}
                value={el.config.value}
                valid={el.config.valid}
                touched={el.config.touched}
                changed={(event) => this.inputChangedHandler(event, el.id)} />)

        let error = this.props.error ? <p className={classes.Error}>{this.props.error.message}</p> : null

        let redirectPath = null;

        if(this.props.isAuthenticated){
            redirectPath = <Redirect to = '/'/>
            if(this.props.building){
                redirectPath = <Redirect to = '/checkout' />
            }
        }

        return (
            <div className={classes.Auth}>
                {redirectPath}
                {this.props.loading ? <Spinner /> :
                    <form onSubmit={this.formHandler}>
                        <h3>{this.state.isSignUp ? 'Sign Up' : 'Sign In' }</h3>
                        {error}
                        {elements}
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                }
                <Button
                    btnType="Danger"
                    clicked={this.switchSignupHandler}>Switch Mode? {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burger.building 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);