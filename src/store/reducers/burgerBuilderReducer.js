import * as actionTypes from '../actions/actionTypes';
import {updateObject, updatePurchaseable} from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
}

const INGREDIENT_PRICES = {
    salad: 0.8,
    sauce: 0.7,
    lentil: 1.6
}

const addIngredient = (state, action) => {
    const updatedIngredients = updateObject(state.ingredients, {[action.ctrType]: state.ingredients[action.ctrType] + 1})
    const updatedState = updateObject(state, {ingredients: updatedIngredients, price: state.price + INGREDIENT_PRICES[action.ctrType], building: true })
    return updatedState
}

const removeIngredient = (state, action) => {
    const building = updatePurchaseable({...state.ingredients, [action.ctrType]:  state.ingredients[action.ctrType] -1})
    const updatedIngredients = updateObject(state.ingredients, {[action.ctrType]: state.ingredients[action.ctrType] - 1})
    const updatedState = updateObject(state, {ingredients: updatedIngredients, price: state.price - INGREDIENT_PRICES[action.ctrType], building: building })
    return updatedState
}

const setIngredients = (state, action) => {
    return updateObject(state, {
        ingredients: action.ingredients,
        error: false,
        price: 4,
        building: false
    })
}

const setIngredientFail = (state, action) => {
    return updateObject(state, {error: true})
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action)
        case actionTypes.SET_INGREDIENTS: return setIngredients(state, action)
        case actionTypes.SET_INGREDIENTS_FAILED: return setIngredientFail(state, action)
        default: return state;
    }

}

export default reducer;