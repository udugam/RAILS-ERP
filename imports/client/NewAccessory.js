import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Accessories from '../api/Accessories';
import {PageHeader,Button,Panel,Table} from 'React-Bootstrap';

class NewAccessory extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addAccessory(event) {
    event.preventDefault();
    const accessoryName = this.refs.accessoryName.value.trim();
    const manufacturer = this.refs.accessoryManufacturer.value.trim();
    const supplier = this.refs.supplier.value.trim();
    const productNumber = this.refs.productNumber.value.trim();
    const cost = this.refs.cost.value.trim();
    const installationTime = this.refs.installationTime.value.trim();
    const minIntWidth = this.refs.minIntWidth.value.trim();
    const minIntHeight = this.refs.minIntHeight.value.trim();
    const minIntDepth = this.refs.minIntDepth.value.trim();

    if (accessoryName != '') {
      Meteor.call('insertNewAccessory',accessoryName,manufacturer,supplier,productNumber,cost,installationTime, minIntWidth, minIntHeight, minIntDepth);
    }
  }


  render() {
    return (
      <div>
        <div>
          <PageHeader>Accessories Database</PageHeader>
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            Add New Accessory
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <form className='form-horizontal' onSubmit={this.addAccessory.bind(this)}>
              {/*1. Input Accessory Name */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Accessory Name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='accessoryName'/>
                </div>
              </div>

              {/*2. Input Manufacturer */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Accessory Manufacturer</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='accessoryManufacturer'/>
                </div>
              </div>

              {/*3. Select Supplier*/}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Supplier</label>
                <div className='col-sm-4'>
                  <select className='form-control' ref='supplier'>
                    <option value='Richelieu'> Richelieu </option>
                    <option value='JC Hardware'> JC Hardware </option>
                    <option value='Hafele'> Hafele </option>
                  </select>
                </div>
              </div>

              {/*4. Input Product Number */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Supplier's Product Number</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='productNumber'/>
                </div>
              </div>

              {/*5. Input Cost*/}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Cost</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' ref='cost' step='0.01'/>
                </div>
              </div>

              {/*6. Input Installation Time*/}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Installation Time</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' ref='installationTime' step='0.01'/>
                </div>
              </div>

              {/*7. Input Minimum Space Required for Accessory*/}
              <div className='form-group'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label className='col-sm-2 control-label'>Minimum Interior Cabinet Dimensions</label>
                    <div className='col-sm-3'>
                      <input type='number' className='form-control' ref='minIntWidth' placeholder='Width' step='0.01'/>
                    </div>
                    <div className='col-sm-3'>
                      <input type='number' className='form-control' ref='minIntHeight' placeholder='Height' step='0.01'/>
                    </div>
                    <div className='col-sm-3'>
                      <input type='number' className='form-control' ref='minIntDepth' placeholder='Depth' step='0.01'/>
                    </div>
                  </div>
                </div>
              </div>

              <button className='btn btn-primary' type='submit'>Add Accessory</button>

            </form>
          </Panel>
        </div>

        {/*Display Accessory List*/}
        <div className='table-responsive'>
          <Table responsive hover>
            <tbody>
              <tr>
                <th>Accessory Name</th>
                <th>Min Cabinet Interior Width</th>
                <th>Min Cabinet Interior Height</th>
                <th>Min Cabinet Interior Depth</th>
                <th>Installation Time</th>
                <th>Manufacturer</th>
                <th>Supplier</th>
                <th>Supplier's Product Number</th>
                <th>Cost</th>
              </tr>
              {this.props.accessories.map((storedAccessory) => {
                  return (
                    <tr key={storedAccessory._id}>
                      <td>{storedAccessory.name}</td>
                      <td>{storedAccessory.minIntWidth}</td>
                      <td>{storedAccessory.minIntHeight}</td>
                      <td>{storedAccessory.minIntDepth}</td>
                      <td>{storedAccessory.installationTime}</td>
                      <td>{storedAccessory.manufacturer}</td>
                      <td>{storedAccessory.supplier}</td>
                      <td>{storedAccessory.productNumber}</td>
                      <td>{storedAccessory.cost}</td>
                    </tr>
                  )
              })}
            </tbody>
          </Table>
        </div>
      </div>
    )
  }
}

export default createContainer(() => {
  if(Meteor.userId()){
    let accessoriesSub = Meteor.subscribe('allAccessories');
  }

  return {
    accessories: Accessories.find({}).fetch(),
  }
}, NewAccessory);
