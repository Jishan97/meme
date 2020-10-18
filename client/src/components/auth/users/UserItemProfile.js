import React, { useEffect, useContext, useState, Fragment } from "react";
import AdminContext from "../../../context/AdminContext";
import { Redirect } from "react-router-dom";
import Spinner from "../../layout/Spinner";

const UserItemProfile = ({ match }) => {
  const adminContext = useContext(AdminContext);
  const {
    getUser,
    user,
    token,
    serviceLoading,
    userMemes,
    user_Memes,
    UnBlockUser,
    blockUser
  } = adminContext;

  useEffect(() => {
    if (!token) {
      return <Redirect to="/login" />;
    }
    getUser(match.params.login);
    userMemes(match.params.login);
    // eslint-disable-next-line
  }, []);

  // const singleUser = user.find((one)=>{
  //   return one.email = match
  // })

  const unblockuser = id => {
    UnBlockUser(id);
  };
  const blockuser = id => {
    blockUser(id);
  };
  if (serviceLoading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div class="media">
          <img
            src={user.user_avatar}
            height="200"
            width="200"
            class="img-thumbnail align-self-start mr-3"
            alt="Hello"
          />

          <div class="media-body">
            <h5 class="mt-0">Name: {user.username}</h5>
            <p>Email: {user.email}</p>
            <p>Tag: {user.user_tag}</p>
            <p>Joining Date: {user.joining_date}</p>
            <p>User Status: {user.user_status}</p>

            <div style={{ display: "flex", flexDirection: "row" }}>
              {user.user_status === "block" ? (
                <button
                  onClick={() => unblockuser(user.email)}
                  style={{ margin: "5px" }}
                  className="btn btn-primary"
                >
                  Unblock
                </button>
              ) : (
                  <button
                    onClick={() => blockuser(user.email)}
                    style={{ margin: "5px" }}
                    className="btn btn-danger"
                  >
                    Block
                </button>
                )}
            </div>

            {/* <Link to={`/user/getSingleUser/${email}`} className="btn btn-primary">View profile</Link> */}
          </div>
        </div>

        <div class="container">
          <div class="row">
            {user_Memes.map(meme => {
              return (
                <div class="col-sm">
                  <div class="card" style={{ width: "18rem", margin: "5px" }}>
                    {/* <img className="card-img-top" src={meme.meme-image} alt="Card image cap"> */}
                    <img
                      src={meme.meme_image}
                      height="100%"
                      width="100%"
                      alt=""
                      style={{ justifyContent: "center" }}
                    />
                    <div class="card-body">
                      <h5 class="card-title">{meme.meme_title}</h5>
                      <p class="card-text">{meme.meme_description}</p>
                       <p class="card-text">{meme.meme_trend}</p>
                       <p class="card-text">{meme.meme_createdAt}</p>
                       <p class="card-text">{meme.meme_type}</p>
                       <p class="card-text">{meme.meme_status}</p>
                       

                       <a href="#" class="btn btn-primary">
                        
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default UserItemProfile;
