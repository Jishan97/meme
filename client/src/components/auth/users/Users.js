import React,{useContext,useEffect} from "react";
import UserItem from './UserItem'
   
import AdminContext from '../../../context/AdminContext';

const Users = () => {
    const adminContext = useContext(AdminContext);

    const {getUsers,users} = adminContext

    useEffect(()=>{
        getUsers()
    },[])

  return (
      <div>    
        <div className="row">
  {
          users.map((user)=>{
                return <UserItem user={user}/>

                  
              })
            }
            </div>
        </div>
  
  );
};

export default Users;
