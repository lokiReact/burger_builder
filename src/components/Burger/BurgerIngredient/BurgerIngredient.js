import React, { Component } from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
    render(){
        let ingredient = null;
        switch(this.props.type){
            case ('bread-bottom'):
                ingredient = <div className={classes.BreadBottom}></div>;
                break;
            case ('bread-top'):
                ingredient = <div className={classes.BreadTop}></div>;
                break;
            case ('lentil'):
                ingredient = <div className={classes.Lentil}></div>;
                break; 
            case ('sauce'):
                ingredient = <div className={classes.Sauce}></div>;
                break; 
            case ('salad'):
                ingredient = <div className={classes.Salad}></div>;
                break; 
            default: 
                ingredient = null
    
        }
        return ingredient;
    }


}
export default BurgerIngredient;

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}