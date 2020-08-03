import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {'label': 'Lentil', type: 'lentil'},
    {'label': 'Salad', type: 'salad'},
    {'label': 'Sauce', type: 'sauce'}
]; 


const buildControls = (props)=> {
    return(
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl 
                    key={ctrl.label} 
                    label={ctrl.label}
                    add = {()=>props.addIngredient(ctrl.type)}
                    remove = {()=> props.removeIngredient(ctrl.type)}
                    disabled = {props.disabledInfo[ctrl.type]}/>
            })}
            <button 
                className={classes.OrderButton} 
                disabled={!props.purchaseable}
                onClick={props.purchasing}>{props.isAuthenticated ? 'Order Now' : 'Login/SignUp to Continue'} </button>
        </div>
    );
} 

export default buildControls;

