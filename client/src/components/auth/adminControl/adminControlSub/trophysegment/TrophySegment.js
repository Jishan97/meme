import React, { useEffect, useContext } from 'react';
import TrophySegmentController from './TrophySegmentController'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import LazyLoad from 'react-lazyload';
import AdminDashboardContext from '../../../../../context/dashboard/AdminDashboardContext'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle
} from 'reactstrap';


const TrophySegment = () => {
    const adminDashboardContext = useContext(AdminDashboardContext);
    const { getTrophySegment, trophySegment, serviceLoading,deleteTrophySegment } = adminDashboardContext;

    useEffect(() => {
        getTrophySegment();
    }, [])

    const onDelete = (id)=>{
        deleteTrophySegment(id);
       
        
      }
    

    return (
        <div>
            <button style={{ margin: '5px' }} class="btn btn-primary btn-block" type="button">Trophy segment</button>
            <div className="row">
                <div className="col">
                    <div id="trophySegment">
                        <div class="card card-body">
                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="jumbotron">
                                        <TrophySegmentController />
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="jumbotron">
                                        <div className="row">

                                            {serviceLoading ? 'Adding trophy details' : trophySegment.map((one) => {
                                                return (
                                                    <div className="col-sm-4">
                                                        <Card style={{ margin: '5px', justifyContent: 'center' }}>
                                                        <LazyLoad height={200}>                                                             <CardImg top width="100%" src={one.image} alt="Card image cap" />
                                                        </LazyLoad>
                                                            <CardBody>
                                                                <CardTitle><span style={{ fontWeight: 'bold' }}>Name:</span> {one.name}</CardTitle>
                                                                <CardSubtitle><span style={{ fontWeight: 'bold' }}>Uploads:</span> {one.uploads}</CardSubtitle>
                                                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                                                    <Button style={{ margin: '4px' }} onClick={()=>onDelete(one._id)} className="btn-danger">Delete</Button>
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
        </div>
    )
}

export default TrophySegment;