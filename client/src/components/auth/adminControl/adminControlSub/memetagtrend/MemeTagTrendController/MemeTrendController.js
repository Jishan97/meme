import React,{useContext,useEffect,useState} from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//AdminDashboard context
import AdminDashboardContext from '../../../../../../context/dashboard/AdminDashboardContext'
const MemeTrendController = () => {
  const adminDashboardContext = useContext(AdminDashboardContext);
    const {uploadTrendingMemesTopic,error,loading} = adminDashboardContext;
  const [SmemeTrend, setSmemeTrend] = useState('');
    
  const onChange = e =>{
    setSmemeTrend(e.target.value)
  }

  function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  const onSubmit = e =>{
      e.preventDefault();
      if (isEmptyOrSpaces(SmemeTrend)) {
        setSmemeTrend('')
    } else {
      uploadTrendingMemesTopic({
        meme_trend:SmemeTrend
      })
      setSmemeTrend('')
    }
 
      
  }
    return (
        <div>
          <Form onSubmit={onSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Meme Trend</Label>
                  <Input type='text' name="memeTrend" value={SmemeTrend} onChange={onChange} placeholder="Enter meme trend" />
                </FormGroup>
                <Button>Add</Button>
              </Form>  
        </div>
    )
}

export default MemeTrendController
