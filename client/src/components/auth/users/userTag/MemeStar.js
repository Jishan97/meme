import React, { useContext, useEffect } from "react";
import UserItem from '../UserItem'
import AdminDashBoardContext from '../../../../context/dashboard/AdminDashboardContext'

const Users = () => {
    const adminDashBoardContext = useContext(AdminDashBoardContext);

    const { UserByTag, getUserByTag } = adminDashBoardContext

    useEffect(() => {
        getUserByTag('memestar')
    }, [])

    return (

        <div>    
        <div className="row">
  {
          UserByTag.map((user)=>{
                return <UserItem user={user}/>

                  
              })
            }
            </div>
        </div>
       
    );
};

export default Users;
