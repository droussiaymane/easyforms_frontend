import React from 'react'
import { TopBarComponent } from './TopBarComponent'
import FormBuilderComponent from './FormBuilderComponent'
import FormBuilderTop from './FormBuilderTop'
const FormBuilder = () => {
  return (
    <div>
        <TopBarComponent />
            <br />
            <FormBuilderTop/>
<FormBuilderComponent/>    </div>
  )
}

export default FormBuilder