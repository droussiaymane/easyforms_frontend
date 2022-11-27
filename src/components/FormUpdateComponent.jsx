import React from 'react';
import { ReactFormBuilder } from 'react-form-builder2';
import FormBuilderComponent from './FormBuilderComponent';
import * as variables from '../utils/variables';
import { TopBarComponent } from './TopBarComponent';
import { getForm } from '../services/form.service';
import { get } from 'jquery';
import { getmyform } from '../utils/requests';
var items = [{
  key: 'TextInput',
}];


class FormUpdateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    name:"",
    mydata:[]
    };

   
  }

onLoad = () => {
    console.log('onLoad', "url");
    return getmyform(2);
  };
  render() {
    
    return (
       <>
           <div>
        <TopBarComponent />
            <br />
            <div>
  <div class="container">
     <FormBuilderComponent variables={variables} name={this.state.name} /> 
  
        <hr></hr>
        <br/>
        <div class="form-group row">
    <label for="name" class="col-sm-2 col-form-label">Form Name</label>
    <div class="col-sm-5">
      <input type="text" class="form-control" id="name" placeholder="Enter name"  onChange={(e)=>this.setState({name:(e.target.value)})}/>
    </div>
  </div> 
        <div>
            </div>
        <ReactFormBuilder
          toolbarItems={items}
          onLoad={this.onLoad}
/>
</div>
</div>
</div>
   
      </>
    );
  }
}

export default FormUpdateComponent;

