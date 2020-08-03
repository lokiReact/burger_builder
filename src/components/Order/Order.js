import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let ing in props.ingredients){
        ingredients.push({name: ing, amount: props.ingredients[ing]})
    }
    const ingData = ingredients.map(ing =>{
        return <span key={ing.name} className={classes.Span}>
            {ing.name}({ing.amount})
        </span>
    })
    return (
        <div className={classes.Order}>
            <p>Order: {ingData}</p>
            <p>Total Price: <strong>AUD {props.price.toFixed(2)}</strong></p>
        </div>
    )
}

export default order;