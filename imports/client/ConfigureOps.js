
  import React, {Component} from 'react';
  import { createContainer } from 'meteor/react-meteor-data';
  import {PageHeader} from 'React-Bootstrap';
  import Operations from '../api/Operations';


  class ConfigureOps extends Component {

    constructor(props) {
      super(props);
      this.state = {
        name: '',
        plantAddress: '',
        monthlyLiabilities: 0,
        manuSpaceFactor: 0,
        designTimeFt: 0,
        cutTimeFt: 0,
        edgeTimeFt: 0,
        assembleTimeFt: 0,
        deliverTimeFt: 0,
        installTimeFt: 0,
        manuShiftLength: 0,
        avgLaborRate: 0,
        numLabor: 0,
        officeShiftLength: 0,
        avgDesignRate: 0,
        numDesign: 0,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value,
     });
    }

    createOperation(event) {
      event.preventDefault();
      const name = this.refs.name.value.trim();
      const plantAddress = this.refs.plantAddress.value.trim();
      const manuSpaceFactor = this.refs.manuSpaceFactor.value.trim();
      const monthlyLiabilities = this.refs.monthlyLiabilities.value.trim();
      const assembleTimeFt = this.refs.assembleTimeFt.value.trim();
      const designTimeFt = this.refs.designTimeFt.value.trim();
      const cutTimeFt = this.refs.cutTimeFt.value.trim();
      const edgeTimeFt = this.refs.edgeTimeFt.value.trim();
      const deliverTimeFt = this.refs.deliverTimeFt.value.trim();
      const installTimeFt = this.refs.installTimeFt.value.trim();
      const manuShiftLength = this.refs.manuShiftLength.value.trim();
      const avgLaborRate = this.refs.avgLaborRate.value.trim();
      const numLabor = this.refs.numLabor.value.trim();
      const officeShiftLength = this.refs.officeShiftLength.value.trim();
      const avgDesignRate = this.refs.avgDesignRate.value.trim();
      const numDesign = this.refs.numDesign.value.trim();
      const activeOperation = this.refs.activeOperation.value.trim();

      if (monthlyLiabilities != '' || cutTimeFt != '' || manuShiftLength != '' || avgLaborRate != '' || numLabor != '') {
        Meteor.call('insertNewOperation',name,plantAddress,manuSpaceFactor,monthlyLiabilities,designTimeFt,cutTimeFt,edgeTimeFt,assembleTimeFt,deliverTimeFt,installTimeFt,manuShiftLength,avgLaborRate,numLabor,officeShiftLength,avgDesignRate,numDesign,activeOperation);
      }
    }

    render() {

      return (
        <div>
          <PageHeader>Create New Operation</PageHeader>
          <div>
            { /*Form Begins*/ }
            <form className='form-horizontal' onSubmit={this.createOperation.bind(this)}>

              { /*Select Status of Operations */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Is this operation currently active?</label>
                <div className='col-sm-4'>
                  <select ref='activeOperation'>
                    <option value= {true}>Yes</option>
                    <option value= {false}>No</option>
                  </select>
                </div>
              </div>

              { /*Input Operation Name */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Operation Name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='name'/>
                </div>
              </div>

              { /*Input Operation Address */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Manufacturing Plant Address</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='plantAddress'/>
                </div>
              </div>

              { /*Input Manufacturing Space Multiple of Office Space */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>How many times is your manufacturing space larger than your Office Space?</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='manuSpaceFactor' step='0.1' ref='manuSpaceFactor' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Monthly Liabilities */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Monthly Liabilities</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='monthlyLiabilities' step='0.01' ref='monthlyLiabilities' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Designing time per a linear foot of cabinetry(ft) */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Designing Time per a Linear Foot of Cabinetry (hrs/ft)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='designTimeFt' step='0.01' ref='designTimeFt' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Cutting time per a linear foot of cabinetry(ft) */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Cutting Time per a Linear Foot of Cabinetry (hrs/ft)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='cutTimeFt' step='0.01' ref='cutTimeFt' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Edging time per a linear foot of cabinetry(ft) */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Edgebanding Time per a Linear Foot of Cabinetry (hrs/ft)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='edgeTimeFt' step='0.01' ref='edgeTimeFt' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Assembly time per a linear foot of cabinetry(ft) */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Assembly Time per a Linear Foot of Cabinetry (hrs/ft)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='assembleTimeFt' step='0.01' ref='assembleTimeFt' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Delivery time per a linear foot of cabinetry(ft) */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Delivery Time per a Linear Foot of Cabinetry (hrs/ft)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='deliverTimeFt' step='0.01' ref='deliverTimeFt' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Install time per a linear foot of cabinetry(ft) */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Install Time per a Linear Foot of Cabinetry (hrs/ft)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='installTimeFt' step='0.01' ref='installTimeFt' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Daily Manufacturing Shift Length */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Manufacturing Shift Length (hrs)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='manuShiftLength' step='0.01' ref='manuShiftLength' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Number of Manufacturing Employees */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Number of Manufacturing Employees</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='numLabor' ref='numLabor' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Average Manufacturing Labor Rate */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Average Manufacturing Labor Rate ($/hr)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='avgLaborRate' ref='avgLaborRate' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Daily Office Shift Length */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Office Shift Length (hrs)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='officeShiftLength' step='0.01' ref='officeShiftLength' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Number of Design Employees */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Number of Designers</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='numDesign' ref='numDesign' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Average Design Rate */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Average Design Rate ($/hr)</label>
                <div className='col-sm-4'>
                  <input type='number' className='form-control' name='avgDesignRate' ref='avgDesignRate' onChange={this.handleInputChange}/>
                </div>
              </div>


              <button className='btn btn-primary' type='submit'>Save Operation </button>
            </form>
          <div>
        </div>
      </div>
    </div>
      );
    }
  }

  export default createContainer(() => {
    if(Meteor.userId()){
      let operationsSub = Meteor.subscribe('allOperations');
    }

    return {
      operations: Operations.find({}).fetch(),
    }
  }, ConfigureOps);
