import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingSummary = Object.keys(props.ingredients)
        .map((igkey) => {
            return(
                <li key={igkey}>
                    <span style={{textTransform: 'capitalize'}}>{igkey}</span>: {props.ingredients[igkey]}
                </li>
            );
        });

    return(
        <Aux>
            <h3>Your delicious burger.</h3>
            <p>Below is the summary of the ingredient:</p>
            <ul>
                {ingSummary}
            </ul>
            <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?...</p>
            <Button btnType='Danger' clicked={props.purchaseCanceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
}

export default orderSummary;