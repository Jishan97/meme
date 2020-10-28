import React,{useState,useContext,Fragment} from 'react'

import {Link} from 'react-router-dom';
import AdminContext from '../../context/AdminContext';



const HeaderNavbar = () => {

    const adminContext = useContext(AdminContext)
    const {isAuthenticated,token, logout} = adminContext;

    const onLogout =()=>{
      logout(); 
  }
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
  
const authLink = (    
  <Fragment>
     <Link to="/" className="nav-link" >Dashboard <span className="sr-only">(current)</span></Link> 
 <li className="nav-item dropdown">
 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   User
 </a>
 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
   <Link to="/users" className="dropdown-item">All Users</Link>
   <Link to="/userByTag" className="dropdown-item">Memes Star</Link>
   <Link to="/blockedUser" className="dropdown-item">Blocked user</Link>

   

 </div>
</li>

<li className="nav-item dropdown">
 <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
   Memes
 </a>
 <div className="dropdown-menu" aria-labelledby="navbarDropdown">
   <Link to="/allMemes" className="dropdown-item">All Memes</Link>
   <a className="dropdown-item" href="#">Trending Memes</a>

 </div>
</li>
<li className="nav-item active">
  <Link to="/adminControl" className="nav-link" >Admin Control </Link>
</li>


            <button onClick={onLogout} style={{float:'right'}} className="btn btn-outline-danger   my-2 my-sm-0" type="submit">Logout</button>
            </Fragment>
)       

const guestLink = (
  <Fragment>
  <li className="nav-item active">
  <Link to="/login" className="nav-link" >Login <span className="sr-only">(current)</span></Link>
</li>

</Fragment>
)


    return (
  //     <div className="navbar bg-primary">
        
  //     <ul>
  //       <li>
  //         <Link to="/">Home</Link>
  //       </li>
  //        {isAuthenticated ? authLink : guestLink}
  //     </ul>
  // </div>

<div className="navbar navbar-expand-lg navbar-light bg-light">
  <Link to="/" className="navbar-brand">MemesClan</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
          </li>

      {isAuthenticated || token? authLink : guestLink}
     
    </ul>
    
  </div>
</div>






    )
}

export default HeaderNavbar;