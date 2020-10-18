import React, { useState, useContext } from "react";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import AdminDashboardContext from "../../../../../context/dashboard/AdminDashboardContext";

axios.defaults.baseURL = "http://localhost:4000";

const TrophySegmentController = () => {
    const adminDashboardContext = useContext(AdminDashboardContext);
    const { getTrophySegment, setLoading } = adminDashboardContext;

    const [trophyS, setTrophyS] = useState({
        trophyName: "",
        trophyLimit: "",
        trophyImage: ""
    });

    const { trophyName, trophyLimit, trophyImage } = trophyS;

    const onChangeImage = e => {
        setTrophyS({
            ...trophyS,
            trophyImage: e.target.files[0]
        });
    };

    const onChange = e => {
        setTrophyS({
            ...trophyS,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = async e => {
        e.preventDefault();
        let formData = new FormData();

        formData.append("imageData", trophyImage);
        formData.append("trophy_name", trophyName);
        formData.append("trophy_uploads", trophyLimit);
        setLoading();
        const imageRes = await axios.post(
            "/api/admin/adminControl/trophySegment",
            formData
        );

        getTrophySegment();
        setTrophyS({
            trophyName: "",
            trophyLimit: "",
            trophyImage: ""
        });
    };

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Trophy name</Label>
                    <Input
                        type="text"
                        name="trophyName"
                        value={trophyName}
                        onChange={onChange}
                        placeholder="Enter trophy name"
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleEmail">Trophy limit</Label>
                    <Input
                        type="number"
                        name="trophyLimit"
                        value={trophyLimit}
                        onChange={onChange}
                        placeholder="Enter trophy limit count"
                    />
                </FormGroup>
                <FormGroup>
                    <Input
                        type="file"
                        name="trophyImage"
                        id="exampleFile"
                        onChange={onChangeImage}
                    />
                    <FormText color="muted">Choose trophy image</FormText>
                </FormGroup>
                <Button>Add</Button>
            </Form>
        </div>
    );
};

export default TrophySegmentController;
