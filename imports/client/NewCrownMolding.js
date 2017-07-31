import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import CrownMoldings from '../api/CrownMoldings';

class NewCrownMolding extends Component {

  addCrownMolding(event) {
    event.preventDefault();
    const crownName = this.refs.crownName.value.trim();
    const supplier = this.refs.supplier.value.trim();
    const ftOak = this.refs.ftOak.value.trim();
    const ftMaple = this.refs.ftMaple.value.trim();
    const ftPoplar = this.refs.ftPoplar.value.trim();
    const ftPine = this.refs.ftPine.value.trim();

    if (crownName != '' && supplier != '') {
      CrownMoldings.insert({
        name: crownName,
        supplier: supplier,
        ftOak: ftOak,
        ftMaple: ftMaple,
        ftPoplar: ftPoplar,
        ftPine:  ftPine,
      });
      this.refs.crownName.value = '';
      this.refs.supplier.value = '';
      this.refs.ftOak.value = '';
      this.refs.ftMaple.value = '';
      this.refs.ftPoplar.value = '';
      this.refs.ftPine.value = '';
    }
  }

  render() {
    return(
      <div>
        <form className='form-horizontal' onSubmit={this.addCrownMolding.bind(this)}>
          {/*1. Input DoorStyle Name */}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Crown Name</label>
            <div className='col-sm-4'>
              <input type='text' className='form-control' ref='crownName'/>
            </div>
          </div>

          {/*2. Input Supplier Name */}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Supplier</label>
            <div className='col-sm-4'>
              <input type='text' className='form-control' ref='supplier'/>
            </div>
          </div>


          {/*4. Input Cost per ft for Oak*/}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Oak Cost/ft</label>
            <div className='col-sm-4'>
              <input type='number' className='form-control' ref='ftOak' step='0.01'/>
            </div>
          </div>

          {/*5. Input Cost per ft for Maple*/}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Maple Cost/ft</label>
            <div className='col-sm-4'>
              <input type='number' className='form-control' ref='ftMaple' step='0.01'/>
            </div>
          </div>

          {/*6. Input Cost per ft for Poplar*/}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Poplar Cost/ft</label>
            <div className='col-sm-4'>
              <input type='number' className='form-control' ref='ftPoplar' step='0.01'/>
            </div>
          </div>

          {/*7. Input Cost per ft for Pine*/}
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Pine Cost/ft</label>
            <div className='col-sm-4'>
              <input type='number' className='form-control' ref='ftPine' step='0.01'/>
            </div>
          </div>

          <button className='btn btn-primary' type='submit'>Add Crown Molding</button>
        </form>

      { /*Display DoorStyle List*/ }
        <div className='table-responsive'>
          <table className='table'>
            <tbody>
              <tr>
                <th>Crown Name</th>
                <th>Supplier</th>
                <th>$/ft Oak</th>
                <th>$/ft Maple</th>
                <th>$/ft Poplar</th>
                <th>$/ft Pine</th>
              </tr>
              {this.props.crownMoldings.map((storedCrownMolding) => {
                  return (
                    <tr key={storedCrownMolding._id}>
                      <td>{storedCrownMolding.name}</td>
                      <td>{storedCrownMolding.supplier}</td>
                      <td>{storedCrownMolding.ftOak}</td>
                      <td>{storedCrownMolding.ftMaple}</td>
                      <td>{storedCrownMolding.ftPoplar}</td>
                      <td>{storedCrownMolding.ftPine}</td>
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
    let crownMoldingSub = Meteor.subscribe('allCrownMoldings');
  }

  return {
    crownMoldings: CrownMoldings.find({}).fetch(),
  }
}, NewCrownMolding);
