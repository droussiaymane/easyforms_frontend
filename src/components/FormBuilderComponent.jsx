import React from 'react';
import { ReactFormGenerator, ElementStore } from 'react-form-builder2';
import { addForm } from '../services/form.service';
import SaveFormComponent from './SaveFormComponent';

export default class FormBuilderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    this._onUpdate = this._onChange.bind(this);
  }

  componentDidMount() {
    ElementStore.subscribe(state => this._onUpdate(state.data));
  }

 
  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  _onSubmit(data) {
    console.log('onSubmit', data);
    // Place code to post json data to server here
  }

  render() {
    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (this.state.shortPreviewVisible) {
      shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }

  
    return (
      <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
        <h4 className="float-left">Preview</h4>
       
<SaveFormComponent data={this.state.data} name={this.props.name} />
        <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={this.showRoPreview.bind(this)}>Read Only Form</button>

     

        { this.state.roPreviewVisible &&
          <div className={roModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={{}}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true} data={this.state.data} />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }

       
      </div>
    );
  }
}


