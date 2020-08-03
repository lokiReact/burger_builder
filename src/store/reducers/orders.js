import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility'

const initialState = {
    orders: [],
    loading: false,
    purchased: false
}

const puchaseBurgerInit = (state, action) => {
    return updateObject(state, {
        purchased: false
    })
}

const postOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: state.orders.concat({id: action.id, ...action.orderData }),
        loading: false,
        purchased: true
    })
}

const postOrderFail = (state, action) => {
    return updateObject(state, {loading: false})
}

const postOrderStart= (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, {loading: true})
}

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orderData,
        loading: false
    })
}

const fetchOrderFail= (state, action) => {
    return updateObject(state, {loading: false})
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_INIT: return puchaseBurgerInit(state, action)
        case actionTypes.POST_ORDER_SUCCESS: return postOrderSuccess(state, action)
        case actionTypes.POST_ORDER_FAIL: return postOrderFail(state, action)
        case actionTypes.POST_ORDER_START: return postOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_START: return fetchOrderStart(state, action)
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action)
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrderFail(state, action)
        default: return state;
    }
} 

export default reducer;