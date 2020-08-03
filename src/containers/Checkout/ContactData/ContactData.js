import React, { Component } from 'react';
import {connect} from 'react-redux';
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import {checkValidity} from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                value: '',
                label: 'Name',
                elType: 'input',
                elConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },

            email: {
                value: '',
                label: 'Email',
                elType: 'input',
                elConfig: {
                    type: 'email',
                    placeholder: 'Your e-mail'
                },
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            zipCode: {
                value: '',
                label: 'ZipCode',
                elType: 'input',
                elConfig: {
                    type: 'text',
                    placeholder: 'Your ZipCode (5-characters)'
                },
                valid: false,
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                touched: false
            },
            country: {
                value: '',
                label: 'Country',
                elType: 'input',
                elConfig: {
                    type: 'text',
                    placeholder: 'Your Counrty'
                },
                valid: false,
                validation: {
                    required: true
                },
                touched: false
            },
            deliveryMethod: {
                value: 'bolt',
                label: 'Delivery Method',
                elType: 'select',
                elConfig: {
                    options: [
                        { value: 'cheapest', display: 'Cheapest' },
                        { value: 'bolt', display: 'Bolt' }
                    ]
                },
                valid: true,
                validation: {
                }
            }
        },
        formValid: false

    }

    orderHandler = (event) => {
        event.preventDefault();

        const orderData = {};
        for (let key in this.state.orderForm){
            orderData[key] = this.state.orderForm[key].value
        }
        const data = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: orderData,
            userId: this.props.userId
        }
        this.props.onBurgerOrder(data, this.props.token);

    }

    inputChangedHandler = (event, el) => {
        const updatedForm = {...this.state.orderForm}
        const updatedElement = {...updatedForm[el]}
        updatedElement.value = event.target.value;
        updatedElement.valid = checkValidity(updatedElement.value, updatedElement.validation);
        updatedElement.touched = true;
        updatedForm[el] = updatedElement;

        let formValid= true;
        for (let identifier in updatedForm){
            formValid = updatedForm[identifier].valid && formValid
        }

        this.setState({orderForm: updatedForm, formValid: formValid}) 
    }

    render() {
        const elArray = [];

        for (let key in this.state.orderForm) {
            elArray.push({ id: key, config: this.state.orderForm[key] })
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

        return (
            <div className={classes.ContactData}>
                <h3>Contact Data</h3>

                {!this.props.loading ? <form onSubmit={this.orderHandler}>
                    {elements}
                    <Button btnType="Success" disabled={!this.state.formValid}>ORDER</Button>
                </form> : <Spinner />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        price: state.burger.price,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onBurgerOrder: (orderData, token) => dispatch(actions.postBurger(orderData, token))
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));