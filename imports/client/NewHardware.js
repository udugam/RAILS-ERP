import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Hardware from '../api/Hardware';
import {PageHeader, Button, Panel} from 'React-Bootstrap';

class NewHardware extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addHardware(event) {
    event.preventDefault();
    const hardwareName = this.refs.name.value.trim();
    const hardwareSupplier = this.refs.supplier.value.trim();
    const hardwareSize = this.refs.size.value.trim();
    const hardwareFinish = this.refs.finish.value.trim();
    const hardwareCost = this.refs.cost.value.trim();

    if (hardwareName != '' && hardwareCost != '') {
      Meteor.call('insertNewHardware',hardwareName, hardwareFinish, hardwareSize, hardwareSupplier, hardwareCost);
    }
  }


  render() {
    return (
      <div>
        <div>
          <PageHeader>Hardware Database</PageHeader>
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            Add New Hardware
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <form className='form-horizontal' onSubmit={this.addHardware.bind(this)}>
              {/*1. Input Hardware Name */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='name'/>
                </div>
              </div>

              {/*2. Input Hardware Finish */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Finish</label>
                <div className='col-sm-4'>
                  <select className='form-control' ref='finish'>
                    <option value='CH'> Chrome </option>
                    <option value='SS'> Stainless Steel </option>
                    <option value='BN'> Brushed Nickel </option>
                    <option value='AN'> Antique Nickel </option>
                    <option value='ORB'> Oil-Rubbed Bronze </option>
                    <option value='BR'> Brass </option>
                  </select>
                </div>
              </div>

              {/*3. Input Hardware Size (Center to Center) */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Center to Center (mm)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' ref='size'/>
                </div>
              </div>

              {/*4. Input Hardware Supplier */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Supplier</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='supplier'/>
                </div>
              </div>

              {/*5. Input Hardware Cost */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Cost</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' ref='cost' step='0.01'/>
                </div>
              </div>

              <button className='btn btn-primary' type='submit'>Add Hardware to Database</button>

            </form>
          </Panel>
        </div>

        {/*Display Material List*/}
        <div className='table-responsive'>
          <table className='table'>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Finish</th>
                <th>Size (mm)</th>
                <th>Supplier </th>
                <th>Cost</th>
              </tr>
              {this.props.hardware.map((storedHardware) => {
                  return (
                    <tr key={storedHardware._id}>
                      <td>{storedHardware.name}</td>
                      <td>{storedHardware.finish}</td>
                      <td>{storedHardware.size}</td>
                      <td>{storedHardware.supplier}</td>
                      <td>{storedHardware.cost}</td>
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
    let hardwareSub = Meteor.subscribe('allHardware');
  }

  return {
    hardware: Hardware.find({}).fetch(),
  }
}, NewHardware);
