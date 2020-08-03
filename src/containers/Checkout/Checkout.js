import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';


class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to='/' />;
        const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null

        if (this.props.ingredients) {
            summary = (<div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCanceled={this.checkoutCancelHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                <Route
                    path={this.props.match.url + '/contact-data'} component={ContactData} />
            </div>)
        }
        return summary
    }
}

const matchStateToProps = state => {
    return {
        ingredients: state.burger.ingredients,
        purchased: state.order.purchased
    }
}


export default connect(matchStateToProps)(Checkout);