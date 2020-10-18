import React, { useState, useReducer } from 'react';
import AdminDashboardContext from './AdminDashboardContext';
import AdminDashboardReducer from './AdminDashboardReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'



import {
        GET_ALL_MEME_TAGS,
        UPLOAD_MEME_TAG,
        GET_ALL_TRENDING_MEME_TOPICS,
        UPLOAD_TRENDING_MEME_TOPIC,
        GET_MEME_OF_THE_DAY,
        UPLOAD_MEME_OF_THE_DAY,
        UPLOAD_TROPHY_SEGMENT,
        DELETE_TROPHY_SEGMENT,
        GET_MEME_COUNT,
        UPDATE_MEME_COUNT,
        GET_UPCOMING_EVENT,
        UPLOAD_UPCOMING_EVENT,
        DELETE_UPCOMING_EVENT,
        UPDATE_UPCOMING_EVENT,
        GET_TOTAL_USER,
        GET_USER_JOINED_TODAY,
        GET_ALL_MEMES,
        GET_USER_BY_USER_STATUS,
        GET_USER_BY_USER_TAG,
        APPROVE_MEME,
        DISSAPPROVE_MEME,
        UPDATE_USER_TAG,
        SET_LOADING, SET_ERROR, CLEAR_ERROR, GET_TROPHY_SEGMENT
} from './type'
import { stat } from 'fs';

axios.defaults.baseURL = "http://localhost:4000"

const AdminDashboardState = props => {
        const initialState = {
                token: localStorage.getItem('token'),
                isAuthenticated: null,
                loading: true,
                error: null,
                //All memes
                allMemes:[],
                //get all meme tags
                memeTags: [],
                //get all trending topics
                trendingMemesTopic: [],
                //meme of the day
                memeOfTheDay: [],
                //all trophy segment
                trophySegment: [],
                //loading
                serviceLoading: false,
                //meme count
                memeCount: '',
                //upcomingEvents
                upcomingEvents: [],
                //total user
                totalUser: '',
                userJoinedToday:''

        }

        const [state, dispatch] = useReducer(AdminDashboardReducer, initialState);


        //Get all memes
        const getAllMemes = async()=>{
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/getAllMemes');
                        dispatch({
                                type: GET_ALL_MEMES,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }

        //Get user by user_tag
        //get all meme star || noob
        const getUserByUserTag = async()=>{
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/userTag/memestar');
                        dispatch({
                                type: GET_USER_BY_USER_TAG,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }

        //Get user by user_status
        //get all blocked users || unblocked users
        const getUserByUserStatus = async()=>{
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/userStatus/memestar');
                        dispatch({
                                type: GET_USER_BY_USER_STATUS,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }


        const approveMeme = ()=>{

        }

        const dissApproveMeme =()=>{

        }

        const UpdateUserTag = ()=>{

        }


        ////////////////////////USER//////////////////////
        ////////////////////////USER//////////////////////

        //Get total user
        //GET request
        const getTotalUser = async() => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/getTotalUsers');
                        dispatch({
                                type: GET_TOTAL_USER,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }

             //Get total user
        //GET request
        const getUserJoinedToday = async() => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/userJoinedToday');
                        dispatch({
                                type: GET_USER_JOINED_TODAY,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }


        ////////////////////////USER//////////////////////
        ////////////////////////USER//////////////////////

        //Get meme count
        //GET request
        const getMemeCount = async () => {
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/memeCount');
                        console.log(res.data)
                        dispatch({
                                type: GET_MEME_COUNT,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }


        //Update meme count
        //POST request

        const updateMemeCount = async (data) => {
                setLoading();
                const config = {
                        headers: {
                                'Content-Type': 'application/json'
                        }
                }

                try {
                        const res = await axios.post('/api/admin/adminControl/memeCount', data, config);

                        dispatch({
                                type: UPDATE_MEME_COUNT,
                                payload: res.data
                        })
                        getMemeCount()
                        // loadUser()
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err
                        })
                }
        }


        //Get all memes tags
        //GET request
        const getMemeTags = async () => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/memeTags');
                        console.log(res.data.meme_tags)
                        dispatch({
                                type: GET_ALL_MEME_TAGS,
                                payload: res.data.meme_tags
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }

        //Upload meme tag
        //POST request
        const uploadMemeTag = async (data) => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                const config = {
                        headers: {
                                'Content-Type': 'application/json'
                        }
                }
                try {
                        const res = await axios.post('/api/admin/adminControl/memeTags', data, config);

                        dispatch({
                                type: UPLOAD_MEME_TAG,
                                payload: res.data
                        })
                        getMemeTags()
                        // loadUser()
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err
                        })
                }
        }

        //Get all trending memes topics
        //GET request
        const getTrendingMemesTopics = async () => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/memeTrend');

                        dispatch({
                                type: GET_ALL_TRENDING_MEME_TOPICS,
                                payload: res.data.meme_trending_topics
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }

        //Upload trending memes topics
        //POST request
        const uploadTrendingMemesTopic = async (data) => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                const config = {
                        headers: {
                                'Content-Type': 'application/json'
                        }
                }
                try {
                        const res = await axios.post('/api/admin/adminControl/memeTrend', data, config);
                        console.log(res.data.meme_trending_topics)
                        dispatch({
                                type: UPLOAD_TRENDING_MEME_TOPIC,
                                payload: res.data
                        })
                        getTrendingMemesTopics()
                        // loadUser()
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err
                        })
                }
        }

        //Get meme of the day
        //GET 
        const getMemeOfTheDay = async () => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/memeOfTheDay');
                        dispatch({
                                type: GET_MEME_OF_THE_DAY,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response.data
                        })
                }
        }


        //Upload meme of the day
        //POST request
        const uploadMemeOfTheDay = (data) => {

        }


        //Upload trophy segment
        //POST request
        const uploadTrophySegment = () => {

        }

        //GET trophy segment
        //GET
        const getTrophySegment = async () => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/trophySegment');
                        dispatch({
                                type: GET_TROPHY_SEGMENT,
                                payload: res.data
                        })
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }



        //get all upcoming events
        //GET request
        const getUpcomingEvents = async () => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                setLoading();
                try {
                        const res = await axios.get('/api/admin/adminControl/upcomingEvent');
                        dispatch({
                                type: GET_UPCOMING_EVENT,
                                payload: res.data
                        })
                        console.log('Event', res.data)
                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }


        //Delete upcoming event
        //DELETE request

        const deleteUpcomingEvent = async (id) => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                const config = {
                        headers: {
                                'Content-Type': 'application/json'
                        }
                }
                setLoading();
                try {
                        const res = await axios.delete(`/api/admin/adminControl/upcomingEvent/${id}`);
                        dispatch({
                                type: DELETE_UPCOMING_EVENT,
                                payload: res.data
                        })
                        getUpcomingEvents()

                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }

        //Delete trophy  segment
        //DELETE request

        const deleteTrophySegment = async (id) => {
                if (localStorage.token) {
                        setAuthToken(localStorage.token)
                }
                const config = {
                        headers: {
                                'Content-Type': 'application/json'
                        }
                }
                setLoading();
                try {
                        const res = await axios.delete(`/api/admin/adminControl/deleteTrophySegment/${id}`);
                        dispatch({
                                type: DELETE_TROPHY_SEGMENT,
                                payload: res.data
                        })
                        getTrophySegment()

                } catch (err) {
                        dispatch({
                                type: SET_ERROR,
                                payload: err.response
                        })
                }
        }





        //loading
        const setLoading = () => {
                dispatch({ type: SET_LOADING })
        }




        return (
                <AdminDashboardContext.Provider
                        value={{
                                //states
                                token: state.token,
                                isAuthenticated: state.isAuthenticated,
                                loading: state.loading,
                                error: state.error,
                                memeTags: state.memeTags,
                                trendingMemesTopic: state.trendingMemesTopic,
                                memeOfTheDay: state.memeTags,
                                trophySegment: state.trophySegment,
                                serviceLoading: state.serviceLoading,
                                memeCount: state.memeCount,
                                upcomingEvents: state.upcomingEvents,
                                userJoinedToday:state.userJoinedToday,
                                totalUser:state.totalUser,

                                //functions
                                getMemeTags,
                                uploadMemeTag,
                                getTrendingMemesTopics,
                                uploadTrendingMemesTopic,
                                getMemeOfTheDay,
                                uploadMemeOfTheDay,
                                getTrophySegment,
                                uploadTrophySegment,
                                getMemeCount,
                                updateMemeCount,
                                getUpcomingEvents,
                                deleteUpcomingEvent,
                                deleteTrophySegment,
                                getTotalUser,
                                getUserJoinedToday,
                                approveMeme,
                                dissApproveMeme,
                                UpdateUserTag,
                                setLoading

                        }}
                >
                        {props.children}
                </AdminDashboardContext.Provider>
        )
}

export default AdminDashboardState;