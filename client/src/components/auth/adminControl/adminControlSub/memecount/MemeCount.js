import React,{useContext,useEffect,useState} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
//AdminDashboard context
import AdminDashboardContext from '../../../../../context/dashboard/AdminDashboardContext'

const MemeCount = () => {
  const adminDashboardContext = useContext(AdminDashboardContext);
  const {getMemeCount,memeCount,error,loading,updateMemeCount} = adminDashboardContext;

  useEffect(()=>{
    getMemeCount();
  },[])
  const [SmemeCount, setSmemeCount] = useState('');

  const onChange = e =>{
    setSmemeCount(e.target.value)
  }

  const onSubmit = e =>{
      e.preventDefault();
      updateMemeCount({
        meme_count:SmemeCount
      })
      setSmemeCount('')
      
  }

  // let formData = new FormData();

  // formData.append("imageData", {
  //   uri: image,
  //   name: `photo.${fileType}`,
  //   title: memeTitle,
  //   description: memeDescription,
  //   type: `image/${fileType}`
  // });
  // formData.append("title", memeTitle);
  return (
    <div>

      {/* <button style={{ margin: '5px' }} class="btn btn-primary btn-block" type="button" data-toggle="collapse" data-target="#memeCount" aria-expanded="false" aria-controls="memeCount">Meme Count</button> */}
      <button style={{ margin: '5px' }} className="btn btn-primary btn-block" type="button">Meme Count</button>

      <div className="row">

        <div className="col">
          {/* <div className="collapse multi-collapse" id="memeCount"> */}
          <div  id="memeCount">
            <div className="card card-body">
              <p>Meme count : <span className="btn btn-success">{memeCount}</span></p>
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  {/* <Label for="exampleEmail">Meme Count</Label> */}
                  <Input type='text' name="memeCount" value={SmemeCount} onChange={onChange} placeholder="Enter meme count" />
                </FormGroup>
                <Button>update</Button>
              </Form>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemeCount;
