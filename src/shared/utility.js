export const updateObject = (oldState, updatedValues) => {
    return{
        ...oldState,
        ...updatedValues
    }
}

export const updatePurchaseable = (ing) =>  {
    const sum = Object.keys(ing)
        .map((igKey) => {
            return ing[igKey]
        })
        .reduce((sum, el) => {
            return sum = sum + el;
        }, 0);
    return (sum > 0);
}


export const checkValidity = (value, rules) => {
    let isValid = true
    if (rules.required){
        isValid = (value.trim() !== '' && isValid)
    }
    if (rules.minLength){
        isValid = (value.trim().length >= rules.minLength && isValid)
    }
    if (rules.maxLength){
        isValid = (value.trim().length <= rules.maxLength && isValid)
    }
    return isValid;
}