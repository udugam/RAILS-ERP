import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Colors from '../api/Colors';

class NewColor extends Component {

  addColor(event) {
    event.preventDefault();
    const colorName = this.refs.colorName.value.trim();
    const finishType = this.refs.finishType.value.trim();


    if (colorName != '') {
      Colors.insert({
        name: colorName,
        finishType: finishType,
      });
      this.refs.colorName.value = '';

    }
  }

  render() {
    return(
      <div>
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

      { /*Display Colors List*/ }
        <div className='table-responsive'>
          <table className='table'>
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
          </table>
        </div>
      </div>
    )
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
