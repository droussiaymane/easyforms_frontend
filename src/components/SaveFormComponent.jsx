import React from 'react'
import { useNavigate } from 'react-router-dom';
import { addForm, updateForm } from '../services/form.service';

const SaveFormComponent = ({id,data,name}) => {
    const navigate=useNavigate();
    const handleCLick=()=>{
      if(id==undefined){
        addForm(data,name).then(res=>navigate("/getallforms")).catch(err=>console.log(err));
      }
      else{
      updateForm(id,name,data).then(res=>navigate("/getallforms")).catch(err=>console.log(err));

      }

    }
  return (
    <div>
                <button className="btn btn-primary float-right" style={{ marginRight: '10px' }} onClick={handleCLick}>{id ?"Update Form" :"Save Form"}</button>

    </div>
  )
}

export default SaveFormComponent