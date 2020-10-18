import React, { useEffect, useContext } from 'react';
import UpcomingEventController from './UpcomingEventController';
import LazyLoad from 'react-lazyload';

import AdminDashboardContext from '../../../../../context/dashboard/AdminDashboardContext'
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle,Button
} from 'reactstrap';
const UpcomingEvent = () => {
  const adminDashboardContext = useContext(AdminDashboardContext);
  const { getUpcomingEvents, upcomingEvents, serviceLoading,deleteUpcomingEvent } = adminDashboardContext;

  useEffect(() => {
    getUpcomingEvents();
  }, [])

  const onDelete = (id)=>{
    deleteUpcomingEvent(id);
  
    
  }

  return (
    <div>
      <button style={{ margin: '5px' }} class="btn btn-primary btn-block" type="button">Upcoming event</button>
      <div className="row">
        <div className="col">
          <div id="UpcomingEvent">
            <div class="card card-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="jumbotron">
                    <UpcomingEventController />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="jumbotron">

                    {serviceLoading ? 'Adding trophy details' :  upcomingEvents.map((one) => {
                      return (
                        <div className="col-sm-6">
                          <Card style={{ margin: '5px', justifyContent: 'center' }}>
                          <LazyLoad height={200}> 
                            <CardImg top width="100%" src={one.image} alt="Card image cap" />
                            </LazyLoad>
                            <CardBody>
                              <CardTitle><span style={{ fontWeight: 'bold' }}>Name:</span> {one.name}</CardTitle>
                              <CardSubtitle><span style={{ fontWeight: 'bold' }}>Date:</span> {one.date}</CardSubtitle>
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button style={{ margin: '4px' }}  onClick={()=>onDelete(one._id)} className="btn-danger">Delete</Button>
                                <Button style={{ margin: '4px' }}>Update</Button>
                              </div>
                            </CardBody>
                          </Card>
                        </div>
                      )
                    })}
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

export default UpcomingEvent;