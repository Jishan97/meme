import React,{useContext,useEffect} from 'react';
import MemeTagController from './MemeTagTrendController/MemeTagController'
import MemeTrendController from './MemeTagTrendController/MemeTrendController'
//AdminDashboard context
import AdminDashboardContext from '../../../../../context/dashboard/AdminDashboardContext'


const MemeTagTrend = () => {
  const adminDashboardContext = useContext(AdminDashboardContext);
  const {getMemeTags,getTrendingMemesTopics,memeTags,trendingMemesTopic,error,loading} = adminDashboardContext;
  useEffect(()=>{
    getMemeTags();
    getTrendingMemesTopics()
  },[])
  return (

    <div>

      <button style={{ margin: '5px' }} className="btn btn-primary btn-block" type="button">Meme tags and Meme Trends</button>

      <div className="row">

        <div className="col">
          <div id="memeTagTrend">
            <div className="card card-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="jumbotron">
      
                                { error? error.msg: memeTags.map((one)=>{
                return (
                  <button key={one} style={{margin:'5px'}} type="button" class="btn btn-success">
                    {one}
                </button>

                )
              })}
                      <MemeTagController/>
                    </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="jumbotron">
                  {  error? error.msg: trendingMemesTopic.map((one)=>{
                return (
                  <button key={one} style={{margin:'5px'}} type="button" class="btn btn-success">
                    {one}
                </button>

                )
              })}
                      <MemeTrendController/>
                    </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeTagTrend;