import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Materials from '../api/Materials';
import {PageHeader, Button, Panel, Table} from 'React-Bootstrap';

class NewMaterial extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addMaterial(event) {
    event.preventDefault();
    const materialName = this.refs.materialName.value.trim() + ' - ' + this.refs.materialCore.value.trim() + ' Core - ' + this.refs.materialThickness.value.trim() + 'mm';
    const materialCore = this.refs.materialCore.value.trim();
    const materialThickness = this.refs.materialThickness.value.trim();
    const sheetW = this.refs.sheetW.value.trim();
    const sheetL = this.refs.sheetL.value.trim();
    const sheetCost = this.refs.sheetCost.value.trim();
    const supplier = this.refs.supplier.value.trim();

    if (materialName != '' && sheetCost != '') {
      Meteor.call('insertNewMaterial',materialName,materialCore,materialThickness,sheetW,sheetL,sheetCost,supplier);
    }
  }


  render() {
    return (
      <div>
        <div>
          <PageHeader>Materials Database</PageHeader>
            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
              Add New Material
            </Button>
            <Panel collapsible expanded={this.state.open}>
              <form className='form-horizontal' onSubmit={this.addMaterial.bind(this)}>
                {/*1. Input Material Name */}
                <div className='form-group'>
                  <label className='col-sm-2 control-label'>Material Name</label>
                  <div className='col-sm-4'>
                    <input type='text' className='form-control' ref='materialName'/>
                  </div>
                </div>

                {/*2. Select core type */}
                <div className='form-group'>
                  <label className='col-sm-2 control-label'>Material Core Type</label>
                  <div className='col-sm-4'>
                    <select className='form-control' ref='materialCore'>
                      <option value='Particle'> Particle </option>
                      <option value='Plywood'> Plywood </option>
                      <option value='MDF'> MDF </option>
                    </select>
                  </div>
                </div>

                {/*3. Select Thickness*/}
                <div className='form-group'>
                  <label className='col-sm-2 control-label'>Thickness (mm)</label>
                  <div className='col-sm-4'>
                    <input type='number' className='form-control' ref='materialThickness' step='0.1'/>
                  </div>
                </div>

                {/*4. Select Sheet Size*/}
                <div className='form-group'>
                  <div className='row'>
                    <div className='col-sm-6'>
                      <label className='col-sm-2 control-label'>Sheet Size (mm)</label>
                      <div className='col-sm-3'>
                        <input type='number' className='form-control' ref='sheetW' placeholder='Width'/>
                      </div>
                      <div className='col-sm-3'>
                        <input type='number' className='form-control' ref='sheetL' placeholder='Length'/>
                      </div>
                    </div>
                  </div>
                </div>


                {/*5. Input Cost*/}
                <div className='form-group'>
                  <label className='col-sm-2 control-label'>Cost per Sheet</label>
                  <div className='col-sm-4'>
                    <input type='number' className='form-control' ref='sheetCost' step='0.01'/>
                  </div>
                </div>

                {/*6. Input Supplier*/}
                <div className='form-group'>
                  <label className='col-sm-2 control-label'>Supplier</label>
                  <div className='col-sm-4'>
                    <select className='form-control' ref='supplier'>
                      <option value='Common Wealth Plywood'> Common Wealth Plywood </option>
                      <option value='Mercury Wood Products'> Mercury Wood Products </option>
                      <option value='Robert Bury'> Robert Bury </option>
                      <option value='McFaddens'> McFaddens </option>
                      <option value='MegaPlus'> Mega Plus </option>
                      <option value='WestonPremiumWoods'> Weston Premium Woods </option>
                    </select>
                  </div>
                </div>

                <button className='btn btn-primary' type='submit'>Add Material to Database</button>

              </form>
            </Panel>


        </div>

        {/*Display Material List*/}
        <Table responsive hover>
          <tbody>
            <tr>
              <th>Material Name</th>
              <th>Core Type</th>
              <th>Thickness (mm)</th>
              <th>Sheet Size (mm x mm)</th>
              <th>Sheet Cost ($)</th>
              <th>Supplier</th>
            </tr>
            {this.props.materials.map((storedMaterial) => {
                return (
                  <tr key={storedMaterial._id}>
                    <td>{storedMaterial.name}</td>
                    <td>{storedMaterial.core}</td>
                    <td>{storedMaterial.thickness}</td>
                    <td>{storedMaterial.sheetW} x {storedMaterial.sheetL}</td>
                    <td>{storedMaterial.sheetCost}</td>
                    <td>{storedMaterial.supplier}</td>
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
    let materialsSub = Meteor.subscribe('allMaterials');
  }

  return {
    materials: Materials.find({}).fetch(),
  }
}, NewMaterial);
