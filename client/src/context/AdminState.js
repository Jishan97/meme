import React, { useReducer } from 'react';
import AdminContext from '../context/AdminContext';
import AdminReducer from './AdminReducer'
import axios from 'axios'
import setAuthToken from '../../src/utils/setAuthToken'

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_ERRORS,
    AUTH_ERROR,
    GET_USERS,
    GET_USERS_FAILED,
    GET_USER,
    GET_USER_FAILED,
    GET_USER_MEME,
    SET_LOADING,
    BLOCK_USER,
    UNBLOCK_USER,
    DELETE_USER,
    MEME_STAR,
    
} from './types'


axios.defaults.baseURL = "http://localhost:4000"


const AdminState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        users: [],
        user: [],
        user_Memes: [],
        meme_star:[],
        serviceLoading: false
    }

    const [state, dispatch] = useReducer(AdminReducer, initialState);
    // Login Admin
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/admin', formData, config);

            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            // loadUser()
        } catch (err) {
            dispatch({
                type: LOGIN_FAIL,
                payload: err
            })
        }
    }

    const getUsers = async () => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get('/api/admin/users/getAllUsers');
            
            dispatch({
                type: GET_USERS,
                payload: res.data
            })
            // loadUser()
        } catch (err) {
            dispatch({
                type: GET_USERS_FAILED,
                payload: err
            })
        }
    }



    const getUser = async (login) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get(`/api/admin/users/getSingleUser/${login}`);

            dispatch({
                type: GET_USER,
                payload: res.data[0]
            })

            // loadUser()
        } catch (err) {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            })
        }
    }

    const userMemes = async (login) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get(`/api/admin/users/getSingleUserMemes/${login}`);
            dispatch({
                type: GET_USER_MEME,
                payload: res.data
            })

            // loadUser()
        } catch (err) {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            })
        }
    }


    const blockUser = async (login) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get(`/api/admin/blockUser/${login}`);
            dispatch({
                type: BLOCK_USER,
                payload: res.data
            })
            getUser(login)
            // loadUser()
        } catch (err) {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            })
        }
    }


    const UnBlockUser = async (login) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get(`/api/admin/UnBlockUser/${login}`);
            dispatch({
                type: UNBLOCK_USER,
                payload: res.data
            })
            
            getUser(login)
            // loadUser()
        } catch (err) {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            })
        }
    }

    const deleteUser = async (login) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get(`/api/admin/deleteUser/${login}`);
            dispatch({
                type: DELETE_USER,
                payload: res.data
            })
            getUsers()
            // getUser(login)
        } catch (err) {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            })
        }
    }

    
    const getMemeStar = async (tag) => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        setLoading()

        try {
            const res = await axios.get(`/api/admin/getAllMemeStar/${tag}`);
            dispatch({
                type: MEME_STAR,
                payload: res.data
            })
            // getUsers()
            // getUser(login)
        } catch (err) {
            dispatch({
                type: GET_USER_FAILED,
                payload: err
            })
        }
    }

    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    }

    const setLoading = () => {
        dispatch({ type: SET_LOADING })
    }

    return (
        <AdminContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                error: state.error,
                users: state.users,
                user: state.user,
                serviceLoading: state.serviceLoading,
                user_Memes: state.user_Memes,
                meme_star:state.meme_star,

                getMemeStar,
                deleteUser,
                blockUser,
                UnBlockUser,
                userMemes,
                getUser,
                getUsers,
                login,
                setLoading,
                logout
            }}>
            {props.children}
        </AdminContext.Provider>

    )
}

export default AdminState;