import React,{useContext,useState,useEffect} from 'react';
import AdminDashboardContext from '../../../context/dashboard/AdminDashboardContext'


const AllMemes = () => {
    const adminDashboardContext = useContext(AdminDashboardContext);
    const {isAuthenticated,getAllMemes,allMemes,dissApproveMeme,approveMeme} = adminDashboardContext;

    useEffect(()=>{
        getAllMemes()
    },[])


   const dissApprove = (id)=>{
    dissApproveMeme(id)
   }

   const approve = (id)=>{
    approveMeme(id)
   }

    return (
        <div class="container">
        <div class="row">
          {allMemes.map(meme => {
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
                     

                     <div style={{ display: "flex", flexDirection: "row" }}>
              {meme.meme_status === "approved" ? (
                <button
                  onClick={() => dissApprove(meme._id)}
                  style={{ margin: "5px" }}
                  className="btn btn-primary"
                >
                  approved
                </button>
              ) : (
                  <button
                    onClick={() => approve(meme._id)}
                    style={{ margin: "5px" }}
                    className="btn btn-danger"
                  >
                    approve
                </button>
                )}
            </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
}

export default AllMemes;