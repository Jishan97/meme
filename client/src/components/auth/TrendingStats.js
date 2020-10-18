import React,{useContext,useEffect} from 'react';
import AdminDashboardContext from '../../context/dashboard/AdminDashboardContext'


const TrendingStats = () => {
    const adminDashboardContext = useContext(AdminDashboardContext);
    const {getMemeTags,getTrendingMemesTopics,memeTags,trendingMemesTopic,error,loading} = adminDashboardContext;


    useEffect(()=>{
      getMemeTags();
      getTrendingMemesTopics()
    },[])

    return (


      <div class="row" style={{display:'flex',justifyContent:"center"}}>
      <div class="col-md-4 text-">
      <div className="jumbotron">
      <h1 class="display-6">Trending Memes</h1>
        


      {  error? error.msg: trendingMemesTopic.map((one)=>{
                return (
                  <button style={{margin:'5px'}} type="button" class="btn btn-primary">
                    {one}
                </button>

                )
              })}
      </div>
      </div>

      <div class="col-md-4 text-center">
      <div className="jumbotron">
      <h1 class="display-6">Meme of the day</h1>
          <button style={{margin:'5px'}} type="button" class="btn btn-success">
              #FauG
            </button>
      </div>
      </div>

      <div class="col-md-4 text-center">
      <div className="jumbotron">
      <h1 class="display-6">Meme Tags</h1>
          { error? error.msg: memeTags.map((one)=>{
                return (
                  <button style={{margin:'5px'}} type="button" class="btn btn-primary">
                    {one}
                </button>

                )
              })}
      </div>
      </div>

    </div>

    )
}


export default TrendingStats