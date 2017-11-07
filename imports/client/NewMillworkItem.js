import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import MillworkItems from '../api/MillworkItems';
import Materials from '../api/Materials';
import {PageHeader, Button, Panel, Table} from 'React-Bootstrap';

class NewMillworkItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addMillworkItem(event) {
    event.preventDefault();
    const type = this.refs.type.value.trim();
    const name = this.refs.name.value.trim();
    const width = this.refs.width.value.trim();
    const height = this.refs.height.value.trim();
    const depth = this.refs.depth.value.trim();
    const cost = this.refs.cost.value.trim();
    const material = this.refs.material.value.trim();

    if (name != '') {
      Meteor.call('insertNewMillworkItem',type,name,width,height,depth,material,cost);
    }
  }

  render() {
    return (
      <div>
        <div>
          <PageHeader>Custom Millwork Database</PageHeader>
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            Add New Custom Millwork Product
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <form className='form-horizontal' onSubmit={this.addMillworkItem.bind(this)}>
              {/*1. Select Type of Millwork Item */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Type of Product</label>
                <div className='col-sm-4'>
                  <select className='form-control' ref='type'>
                    <option value='Canopy'> Canopy </option>
                    <option value='Post'> Post </option>
                    <option value='Cabinet'> Cabinet </option>
                    <option value='Miscellaneous'> Miscellaneous </option>
                  </select>
                </div>
              </div>

              {/*2. Input Name */}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='name'/>
                </div>
              </div>

              {/*3. Input Dimensions of Item*/}
              <div className='form-group'>
                <div className='row'>
                  <div className='col-sm-6'>
                    <label className='col-sm-2 control-label'>Item Dimensions</label>
                    <div className='col-sm-3'>
                      <input type='number' className='form-control' ref='width' placeholder='Width' step='0.01'/>
                    </div>
                    <div className='col-sm-3'>
                      <input type='number' className='form-control' ref='height' placeholder='Height' step='0.01'/>
                    </div>
                    <div className='col-sm-3'>
                      <input type='number' className='form-control' ref='depth' placeholder='Depth' step='0.01'/>
                    </div>
                  </div>
                </div>
              </div>

              { /*Select Construction Material*/ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Material</label>
                <div className='col-sm-4'>
                  <select className='form-control' ref='material' >
                    <option> ... </option>
                    {this.props.materials.map((storedMaterial) => {
                      return (
                        <option value={storedMaterial.name} key={storedMaterial._id}>
                          {storedMaterial.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              </div>

              {/*4. Input cost*/}
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Cost (Materials, Finishing, Labor, & Installation)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' ref='cost' step='0.01'/>
                </div>
              </div>

              <button className='btn btn-primary' type='submit'>Add Millwork Item</button>

            </form>
          </Panel>

        </div>

        {/*Display Millwork Item List*/}
        <div className='table-responsive'>
          <Table responsive hover>
            <tbody>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Width</th>
                <th>Height</th>
                <th>Depth</th>
                <th>Material</th>
                <th>Cost</th>
              </tr>
              {this.props.millworkItems.map((storedMillworkItem) => {
                  return (
                    <tr key={storedMillworkItem._id}>
                      <td>{storedMillworkItem.type}</td>
                      <td>{storedMillworkItem.name}</td>
                      <td>{storedMillworkItem.width}</td>
                      <td>{storedMillworkItem.height}</td>
                      <td>{storedMillworkItem.depth}</td>
                      <td>{storedMillworkItem.material}</td>
                      <td>{storedMillworkItem.cost}</td>
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
    let millworkItemsSub = Meteor.subscribe('allMillworkItems');
    let materialsSub = Meteor.subscribe('allMaterials');
  }

  return {
    millworkItems: MillworkItems.find({}).fetch(),
    materials: Materials.find({}).fetch(),
  }
}, NewMillworkItem);
