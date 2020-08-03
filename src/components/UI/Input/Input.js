import React from 'react';
import classes from './Input.css';

const input = (props) => {
    let inputEl = null;
    let inputClasses = [classes.InputEl]
    if (!props.valid && props.touched){
        inputClasses.push(classes.Invalid)
    }
    switch (props.elType) {
        case ('input'):
            inputEl = <input onChange={props.changed} className={inputClasses.join(' ')} {...props.elConfig} value={props.value} />
            break;
        case ('textArea'):
            inputEl = <textarea onChange={props.changed} className={inputClasses.join(' ')} {...props.elConfig} value={props.value} />
            break;
        case ('select'):
            inputEl = (<select onChange={props.changed} className={inputClasses.join(' ')} value={props.value}>
                {props.elConfig.options.map(option => {
                    return <option key={option.value} value={option.value}>
                        {option.display}
                    </option>
                })}
            </select>)
            break;
        default: inputEl = <input className={classes.InputEl} {...props.elConfig} value={props.value} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    )
}

export default input;