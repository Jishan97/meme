import React,{useState,useContext,useEffect} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import AdminContext from '../../context/AdminContext'

const Login = (props) => {
    const adminContext = useContext(AdminContext);
    const {login, error, isAuthenticated} = adminContext;

    const [user, setUser] = useState({
        email:'',
        password:''
    })

    useEffect(()=>{
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error) {
            console.log(error)
        }
        
    })
    const {email, password} = user

    const onChange = e =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }


    const onSubmit = e =>{
        e.preventDefault();
        if(email === '' || password === ''){
            console.log('Enter')
        } else {
           login({
               email,
               password
           })
        }
    }

    return (
        <div className="container-fluid" style={{width:'60%'}}>
      <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email"value={email} onChange={onChange} placeholder="Email" />
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password"  value={password} onChange={onChange} placeholder="Password" />
      </FormGroup>
      <Button>Submit</Button>
    </Form>
        </div>
  
    )
}

export default Login;
