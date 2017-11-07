import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import DoorStyles from '../api/DoorStyles';
import {PageHeader, Button, Panel, Table} from 'React-Bootstrap';

class NewDoorStyle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addDoorStyle(event) {
    event.preventDefault();
    const doorName = this.refs.doorName.value.trim();
    const supplier = this.refs.supplier.value.trim();
    const itemCost = this.refs.itemCost.value.trim();
    const sqftOak = this.refs.sqftOak.value.trim();
    const sqftMaple = this.refs.sqftMaple.value.trim();
    const sqftCherry = this.refs.sqftCherry.value.trim();
    const sqftMDF = this.refs.sqftMDF.value.trim();

    if (doorName != '') {
      Meteor.call('insertNewDoorStyle',doorName,supplier,itemCost,sqftOak,sqftMaple,sqftCherry,sqftMDF);
      this.refs.doorName.value = '';
      this.refs.supplier.value = '';
    }
  }

  render() {
    return(
      <div>
        <PageHeader>Door Styles Database</PageHeader>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          Add New DoorStyle
        </Button>
        <Panel collapsible expanded={this.state.open}>
          <form className='form-horizontal' onSubmit={this.addDoorStyle.bind(this)}>
            {/*1. Input DoorStyle Name */}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>DoorStyle Name</label>
              <div className='col-sm-4'>
                <input type='text' className='form-control' ref='doorName'/>
              </div>
            </div>

            {/*2. Input Supplier Name */}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Supplier</label>
              <div className='col-sm-4'>
                <input type='text' className='form-control' ref='supplier'/>
              </div>
            </div>

            {/*3. Input Setup Cost Per One Door */}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Setup Cost Per Door</label>
              <div className='col-sm-4'>
                <input type='number' className='form-control' ref='itemCost' placeholder='$' step='0.01'/>
              </div>
            </div>

            {/*4. Input Cost per ft^2 for Oak*/}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Oak</label>
              <div className='col-sm-4'>
                <input type='number' className='form-control' ref='sqftOak' placeholder='Cost/ft^2' step='0.01'/>
              </div>
            </div>

            {/*5. Input Cost per ft^2 for Maple*/}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Maple</label>
              <div className='col-sm-4'>
                <input type='number' className='form-control' ref='sqftMaple' placeholder='Cost/ft^2' step='0.01'/>
              </div>
            </div>

            {/*6. Input Cost per ft^2 for Cherry*/}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Cherry</label>
              <div className='col-sm-4'>
                <input type='number' className='form-control' ref='sqftCherry' placeholder='Cost/ft^2' step='0.01'/>
              </div>
            </div>

            {/*7. Input Cost per ft^2 for MDF*/}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>MDF</label>
              <div className='col-sm-4'>
                <input type='number' className='form-control' ref='sqftMDF' placeholder='Cost/ft^2' step='0.01'/>
              </div>
            </div>

            {/*8. Input Cost per ft^2 for Slab*/}
            <div className='form-group'>
              <label className='col-sm-2 control-label'>Slab</label>
              <div className='col-sm-4'>
                <input type='number' className='form-control' ref='sqftSlab' placeholder='Cost/ft^2' step='0.01'/>
              </div>
            </div>

            <button className='btn btn-primary' type='submit'>Add Door Style to Database</button>
          </form>
        </Panel>


      { /*Display DoorStyle List*/ }
        <Table responsive hover>
          <tbody>
            <tr>
              <th>DoorStyle</th>
              <th>Supplier</th>
              <th>Setup Cost Per Door</th>
              <th>Oak</th>
              <th>Maple</th>
              <th>Cherry</th>
              <th>MDF</th>
              <th>Slab</th>
            </tr>
            {this.props.doorStyles.map((storedDoorStyle) => {
                return (
                  <tr key={storedDoorStyle._id}>
                    <td>{storedDoorStyle.name}</td>
                    <td>{storedDoorStyle.supplier}</td>
                    <td>{storedDoorStyle.itemCost}</td>
                    <td>{storedDoorStyle.sqftOak}</td>
                    <td>{storedDoorStyle.sqftMaple}</td>
                    <td>{storedDoorStyle.sqftCherry}</td>
                    <td>{storedDoorStyle.sqftMDF}</td>
                    <td>{storedDoorStyle.sqftSlab}</td>
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
    let doorsSub = Meteor.subscribe('allDoorStyles');
  }

  return {
    doorStyles: DoorStyles.find({}).fetch(),
  }
}, NewDoorStyle);
