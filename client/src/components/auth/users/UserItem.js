import React,{useContext} from 'react'
import { Media } from 'reactstrap';
import {Link} from 'react-router-dom';
import AdminContext from '../../../context/AdminContext'

const UserItem = (props) => {
    const {email,username,user_tag,joining_date,user_avatar} = props.user;

    const adminContet = useContext(AdminContext);
    const {deleteUser} = adminContet;
    
    const onDeleteUser =(id)=>{
        deleteUser(id)
    }

    return (
    
        <div className="col-sm-6">

        <div class="media" style={{margin:'5px'}}>
      <img src={user_avatar} height='200' width="200" class="img-thumbnail align-self-start mr-3" alt="Hello" />
   
      <div class="media-body">
        <h5 class="mt-0">Name: {username}</h5>
        <p>
          Email: {email}
        </p>
        <p>
          Tag: {user_tag}
        </p>
        <p>
          Joining Date: {joining_date}
        </p>
          <div style={{display:'flex',flexDirection:'row'}}>
            <Link style={{margin:'5px'}} to={`/user/getSingleUser/${email}`} className="btn btn-primary">View profile</Link>
            <button onClick={()=>onDeleteUser(email)} style={{margin:'5px'}} to={`/user/getSingleUser/${email}`} className="btn btn-danger">Delete </button>

            </div>
      </div>
    </div>
        </div>
      
    )
}

export default UserItem