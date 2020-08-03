import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import {updatePurchaseable} from '../../shared/utility'


class BurgerBuilder extends Component {
    state = {
        purchasing: false, //Used for checking if the modal should be shown
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        }else{
            this.props.history.push('/auth');
        }
    }

    cancelPurchasehandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseSuccessHandler = () => {
        this.props.onPurchaseBurger();
        this.props.history.push('/checkout')
    }

    render() {
        const disabledInfo = { ...this.props.ings }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner />
        if (this.props.ings ) {
            burger = <Aux>
                <Burger ingredients={this.props.ings } />
                <BuildControls
                    addIngredient={this.props.onAddIngredients}
                    removeIngredient={this.props.onRemoveIngredients}
                    disabledInfo={disabledInfo}
                    price={this.props.price}
                    purchasing={this.purchaseHandler}
                    isAuthenticated={this.props.isAuthenticated}
                    purchaseable={updatePurchaseable(this.props.ings)} />
            </Aux>
            orderSummary = <OrderSummary
                ingredients={this.props.ings }
                totalPrice={this.props.price}
                purchaseCanceled={this.cancelPurchasehandler}
                purchaseContinued={this.purchaseSuccessHandler} />
        }

        if (this.props.error) {
            burger = <p style={{ textAlign: 'center' }}>Something went wrong!!!!!</p>
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.cancelPurchasehandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burger.ingredients,
        price: state.burger.price,
        error: state.burger.error,
        isAuthenticated: state.auth.token!== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ctrType) => dispatch(actions.addIngredients(ctrType)),
        onRemoveIngredients: (ctrType) => dispatch(actions.removeIngredients(ctrType)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseBurger: () => dispatch(actions.purchaseBurgerInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));