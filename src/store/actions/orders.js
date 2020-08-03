import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const postBurgerStart = () => {
    return {
        type: actionTypes.POST_ORDER_START
    }
}


export const postBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionTypes.POST_ORDER_SUCCESS,
        id: orderId,
        orderData: orderData
    }
}

export const postBurgerFail = (error) => {
    return {
        type: actionTypes.POST_ORDER_FAIL,
        error: error
    }
}

export const postBurger = (orderData, token) => {
    return dispatch => {
        dispatch(postBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch(postBurgerSuccess(response.data.name, orderData))
        })
        .catch(error => {
            dispatch(postBurgerFail(error))
        });
    }
}

export const purchaseBurgerInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    }
}

export const fetchOrdersStart = () => {
    return{
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orderData) => {
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orderData: orderData
    }
}

export const fetchOrdersFail = (error) => {
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrder = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('orders.json'+queryParams).then(response => {
            const orderData = []
            for (let key in response.data){
                orderData.push({...response.data[key], id: key})
            }
            dispatch(fetchOrdersSuccess(orderData))
        }).catch(error => {
            dispatch(fetchOrdersFail({error: error}))
        })
    }
}