import React, { useState } from 'react';
import { ReactFormBuilder } from 'react-form-builder2';
import FormBuilderComponent from './FormBuilderComponent';
import * as variables from '../utils/variables';
import { TopBarComponent } from './TopBarComponent';

import { getmyform } from '../utils/requests';
import { useParams } from 'react-router-dom';
const FormUpdateComponent = () => {
  const params= useParams();

  var items = [{
    key: 'TextInput',
  }];



    const [name,setName]=useState("");

    const onLoad = () => {
      console.log('onLoad', "url");
      return getmyform(params.id);
    };

  return (
    <>
         <div>
        <TopBarComponent />
            <br />
            <div>
  <div class="container">
     <FormBuilderComponent variables={variables} name={name} id={params.id} /> 
  
        <hr></hr>
        <br/>
        <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Form Name</label>
    <div class="col-sm-5">
      <input type="text" class="form-control" id="name" placeholder="Enter name"  onChange={(e)=>setName(e.target.value)}/>
    </div>
  </div> 
        <div>
            </div>
        <ReactFormBuilder
          toolbarItems={items}
          onLoad={onLoad}
/>
</div>
</div>
</div>
    </>
  )
}

export default FormUpdateComponent