import React,{Fragment} from 'react';
//User Stats
import UsersStats from './UsersStats'
//Trending Stats
import TrendingStats from './TrendingStats'
const Home = () => {
    return (
        <Fragment>
        <UsersStats/>
        <TrendingStats/>
        </Fragment>
         
    )
}

export default Home;