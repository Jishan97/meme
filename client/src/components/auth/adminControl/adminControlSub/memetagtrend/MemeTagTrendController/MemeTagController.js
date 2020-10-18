import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//AdminDashboard context
import AdminDashboardContext from '../../../../../../context/dashboard/AdminDashboardContext'

const MemeTagController = () => {
    const adminDashboardContext = useContext(AdminDashboardContext);
    const { uploadMemeTag, error, loading } = adminDashboardContext;
    useEffect(() => {
        // getMemeCount();
    }, [])
    const [SmemeTag, setSmemeTag] = useState('');

    const onChange = e => {
        setSmemeTag(e.target.value)
    }

    function isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }

    const onSubmit = e => {
        e.preventDefault();
        if (isEmptyOrSpaces(SmemeTag)) {
            setSmemeTag('')
        } else {
            uploadMemeTag({
                meme_tag: SmemeTag.trim()
            })
            setSmemeTag('')
        }

    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <FormGroup>
                    <Label for="exampleEmail">Meme Tag</Label>
                    <Input type='text' name="memeTag" value={SmemeTag} onChange={onChange} placeholder="Enter meme count" />
                </FormGroup>
                <Button>Add</Button>
            </Form>
        </div>
    )
}

export default MemeTagController
