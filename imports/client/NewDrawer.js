import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Drawers from '../api/Drawers';
import {PageHeader, Button, Panel, Table} from 'React-Bootstrap';

class NewDrawer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addDrawer(event) {
    event.preventDefault();
    const drawerManufacturer = this.refs.manufacturer.value.trim();
    const drawerModel = this.refs.model.value.trim();
    const drawerDepth = this.refs.depth.value.trim();
    const drawerHeight = this.refs.height.value.trim();
    const drawerColor = this.refs.color.value.trim();
    const drawerCapacity = this.refs.capacity.value.trim();
    const drawerSupplier = this.refs.supplier.value.trim();
    const drawerCost = this.refs.cost.value.trim();

    if (drawerCost != '' && drawerSupplier != '') {
      Meteor.call('insertNewDrawer',drawerManufacturer,drawerModel,drawerDepth,drawerHeight,drawerColor,drawerCapacity,drawerSupplier,drawerCost);
    }
  }


  render() {
    return (
      <div>
        <div>
          <PageHeader>Drawer Database</PageHeader>
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            Add New Drawer
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <form className='form-horizontal' onSubmit={this.addDrawer.bind(this)}>
              {/*1. Input Drawer Manufacturer */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Manufacturer</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='manufacturer'/>
                </div>
              </div>

              {/*2. Input Drawer Model */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Model</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='model'/>
                </div>
              </div>

              {/*3. Input Drawer Depth */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Depth</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' ref='depth'/>
                </div>
              </div>

              {/*4. Input Drawer Height */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Height</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='height'/>
                </div>
              </div>

              {/*5. Input Drawer Color */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Color</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='color'/>
                </div>
              </div>

              {/*6. Input Drawer Capacity */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Weight Capacity</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='capacity'/>
                </div>
              </div>

              {/*7. Input Drawer Supplier */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Supplier</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='supplier'/>
                </div>
              </div>

              {/*8. Input Drawer Cost */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Cost</label>
                <div className='col-sm-4'>
                  <input type='number' step='.01' className='form-control' ref='cost'/>
                </div>
              </div>

              <button className='btn btn-primary' type='submit'>Add Drawer</button>

            </form>
          </Panel>
        </div>

        {/*Display Drawer List*/}
        <Table responsive hover>
          <tbody>
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Depth</th>
              <th>Height</th>
              <th>Color</th>
              <th>Weight Capacity</th>
              <th>Supplier</th>
              <th>Cost</th>
            </tr>
            {this.props.drawers.map((storedDrawer) => {
                return (
                  <tr key={storedDrawer._id}>
                    <td>{storedDrawer.manufacturer}</td>
                    <td>{storedDrawer.model}</td>
                    <td>{storedDrawer.depth}</td>
                    <td>{storedDrawer.height}</td>
                    <td>{storedDrawer.color}</td>
                    <td>{storedDrawer.capacity}</td>
                    <td>{storedDrawer.supplier}</td>
                    <td>{storedDrawer.cost}</td>
                  </tr>
                )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default createContainer(() => {
  if(Meteor.userId()){
    let drawersSub = Meteor.subscribe('allDrawers');
  }

  return {
    drawers: Drawers.find({}).fetch(),
  }
}, NewDrawer);
