import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addForm } from '../services/form.service';

const SaveFormComponent = ({data,name}) => {
    const navigate=useNavigate();
    const handleCLick=()=>{
        addForm(data,name).then(res=>navigate("/getallforms")).catch(err=>console.log(err));

    }
  return (
    <div>
                <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={handleCLick}>Save Form</button>

    </div>
  )
}

export default SaveFormComponent