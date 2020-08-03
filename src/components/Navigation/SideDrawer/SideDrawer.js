import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let assignedClasses = [classes.SideDrawer, classes.Close];
    if (props.show){
        assignedClasses = [classes.SideDrawer, classes.Open];
    }
    return(
        <Aux>
            <Backdrop show={props.show} closed={props.clicked}/>
            <div className={assignedClasses.join(' ')} onClick={props.clicked}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>   
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;