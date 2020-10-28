import React, { useContext, useEffect } from "react";
import UserItem from '../UserItem'
import AdminDashBoardContext from '../../../../context/dashboard/AdminDashboardContext'

const BlockedUser = () => {
    const adminDashBoardContext = useContext(AdminDashBoardContext);

    const { UserByStatus, getUserByStatus } = adminDashBoardContext

    useEffect(() => {
        getUserByStatus('block')
    }, [])

    return (

        <div>    
        <div className="row">
  {
          UserByStatus.map((user)=>{
                return <UserItem user={user}/>

                  
              })
            }
            </div>
        </div>
       
    );
};

export default BlockedUser;
