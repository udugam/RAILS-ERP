import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Colors from '../api/Colors';
import {PageHeader, Button, Panel, Table} from 'React-Bootstrap';

class NewColor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addColor(event) {
    event.preventDefault();
    const colorName = this.refs.colorName.value.trim();
    const finishType = this.refs.finishType.value.trim();


    if (colorName != '') {
      Meteor.call('insertNewColor',colorName,finishType);
      this.refs.colorName.value = '';
    }
  }

  render() {
    if (Meteor.userId()) {
      return(
        <div>
          <PageHeader>Colors & Stains Database</PageHeader>
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            Add New Color
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <form className='form-horizontal' onSubmit={this.addColor.bind(this)}>
              {/*1. Input Color Name */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Color Name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='colorName'/>
                </div>
              </div>

              {/*2. Select Finish Type */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Finish Type</label>
                <div className='col-sm-4'>
                  <select className='form-control' ref='finishType'>
                    <option value='Paint'> Paint </option>
                    <option value='Stain'> Stain </option>
                    <option value='Paint With Glaze'> Paint With Glaze </option>
                  </select>
                </div>
              </div>
              <button className='btn btn-primary' type='submit'>Add New Color</button>
            </form>
          </Panel>


        { /*Display Colors List*/ }
          <Table responsive hover>
            <tbody>
              <tr>
                <th>Color Name</th>
                <th>Finish Type</th>
              </tr>
              {this.props.colors.map((storedColor) => {
                  return (
                    <tr key={storedColor._id}>
                      <td>{storedColor.name}</td>
                      <td>{storedColor.finishType}</td>
                    </tr>
                  )
              })}
            </tbody>
          </Table>
        </div>
      )
    }
    return <div></div>;
  }

}

export default createContainer(() => {
  if(Meteor.userId()){
    let colorsSub = Meteor.subscribe('allColors');
  }

  return {
    colors: Colors.find({}).fetch(),
  }
}, NewColor);
