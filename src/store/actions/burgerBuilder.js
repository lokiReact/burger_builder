import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (ctrType) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ctrType: ctrType
    }
}

export const removeIngredients = (ctrType) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ctrType: ctrType
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const setIngredientsFailed = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch =>{
        axios.get('/ingredients.json').then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(setIngredientsFailed());
        })
    }
} 
