import React, { useState, useContext } from 'react';
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import AdminDashboardContext from '../../../../../context/dashboard/AdminDashboardContext'
axios.defaults.baseURL = "http://localhost:4000"



const UpcomingEventController = () => {
    const adminDashboardContext = useContext(AdminDashboardContext);
    const { getUpcomingEvents, upcomingEvents, setLoading } = adminDashboardContext;


    const [upcomingEventS, setUpcomingEventS] = useState({
        name: '',
        date: '',
        image: ''
    })

    const { name, date, image } = upcomingEventS;
    const onChangeImage = (e) => {
        setUpcomingEventS({
            ...upcomingEventS,
            image: e.target.files[0]
        })
    }

    const onChange = (e) => {
        setUpcomingEventS({
            ...upcomingEventS,
            [e.target.name]: e.target.value
        })
    }


    const onSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("imageData", image);
        formData.append("eventName", name);
        formData.append("eventDate", date);
        setLoading();
        const imageRes = await axios.post("/api/admin/adminControl/upcomingEvent", formData);
        getUpcomingEvents()
        setUpcomingEventS({
            trophyName: '',
            trophyLimit: '',
            trophyImage: ''
        })
    }


    return (
        <div>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Event name</Label>
                    <Input type='text' name="name" value={name} onChange={onChange} placeholder="Enter event name" />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Event date</Label>
                    <Input type='date' name="date" value={date} onChange={onChange} placeholder="Select event date" />
                </FormGroup>
                <FormGroup>

                    <Input type="file" name="file" onChange={onChangeImage} id="exampleFile" />
                    <FormText color="muted">
                        Choose event image
        </FormText>
                </FormGroup>

                <Button>Add</Button>
            </Form>

        </div>
    )
}

export default UpcomingEventController;