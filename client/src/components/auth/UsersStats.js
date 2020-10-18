import React,{Fragment,useEffect,useContext} from 'react'
import AdminDashboardContext from '../../context/dashboard/AdminDashboardContext'
import {Link} from 'react-router-dom';

const UsersStats = () => {
      const adminDashboardContext = useContext(AdminDashboardContext);
      const {userJoinedToday,totalUser,getUserJoinedToday,getTotalUser} = adminDashboardContext;



      useEffect(() => {
            getUserJoinedToday()
            getTotalUser()
        }, [])
    return (
        
        <div class="row" style={{display:'flex',justifyContent:"center"}}>
        <div class="col-md-5 text-center">
        <div className="jumbotron">
  <h1 className="display-4">Total Users</h1>
  <p className="lead">{totalUser?totalUser:'Counting total users'}</p>
  
  <Link to="/users" className="btn btn-primary btn-lg" role="button">See all</Link>
        </div>
        </div>

        <div class="col-md-5 text-center">
        <div className="jumbotron">
  <h1 className="display-4">Joined Today</h1>
  <p className="lead">{userJoinedToday?userJoinedToday:'No user joined today'}</p>
  <a className="btn btn-primary btn-lg" href="#" role="button">See all</a>
        </div>
        </div>

      </div>
         
    )
}

export default UsersStats;