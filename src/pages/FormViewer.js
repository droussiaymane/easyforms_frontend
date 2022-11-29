import React, { useEffect, useState } from 'react'
import { ReactFormGenerator } from 'react-form-builder2'
import FormBuilderComponent from '../components/FormBuilderComponent'
import FormBuilderTop from '../components/FormBuilderTop'
import { TopBarComponent } from '../components/TopBarComponent'
import { getForm } from '../services/form.service'
import { useParams } from 'react-router';
import authService from '../services/auth.service'
import { useNavigate } from 'react-router-dom';



const FormViewer = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();

    
   const [content,setContent]=useState([]);
   useEffect(()=>{
    const islogged=authService.islogged()

        if(!islogged){
            authService.logout()
            navigate("/")
        };
getForm(id).then(res=>setContent(res.data)).catch(err=>console.log(err))    
})

  return (
<div>
        <TopBarComponent />
            <br />
            <div >
  <div class="container" style={{width:"30%"}}>
  <ReactFormGenerator
                   hide_actions={true} 
                  data={content} />

<button className='btn btn-primary' disabled>submit</button>

  </div>
</div>


   </div>  )
}

export default FormViewer