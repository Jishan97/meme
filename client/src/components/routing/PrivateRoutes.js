import React,{useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import AdminContext from '../../context/AdminContext'

const PrivateRoutes = ({component: Component, ...rest}) => {

    const adminContext = useContext(AdminContext);
    const {isAuthenticated, loading,token} = adminContext;

    return (
    <Route {...rest} render={props => !token  ? (
        <Redirect to="/login" /> 
    ):(
        <Component {...props}/>
    )} />
    )
}

export default PrivateRoutes;