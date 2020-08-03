import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    const ing = Object.keys(props.ingredients)
        .map(igkey => { return [...Array(props.ingredients[igkey])]
            .map((_,i) => { return <BurgerIngredient key={igkey+i} type={igkey} />})
        }).reduce((arr, el) => {
            return arr.concat(el);
        }, []); 


    return(
        <div className={classes.Burger}>
            <BurgerIngredient type= 'bread-top'/>
            {ing.length > 0 ? ing : <strong>Please add some ingredients!!</strong>}
            <BurgerIngredient type= 'bread-bottom'/>
        </div>
    );

}

export default burger;