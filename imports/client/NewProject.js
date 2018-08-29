if (Meteor.userId()) {
  import React, {Component} from 'react';
  import { createContainer } from 'meteor/react-meteor-data';
  import {PageHeader, Tabs, Tab, Table, Row, Button} from 'React-Bootstrap';

  import NewQuote from './NewQuote';
  import Quotes from '../api/Quotes';
  import Materials from '../api/Materials';
  import DoorStyles from '../api/DoorStyles';
  import Colors from '../api/Colors';
  import Drawers from '../api/Drawers';
  import Hardware from '../api/Hardware';
  import CrownMoldings from '../api/CrownMoldings';
  import Operations from '../api/Operations';
  import Accessories from '../api/Accessories';
  import MillworkItems from '../api/MillworkItems';
  import DisplayCosts from '../client/pricing_components/DisplayCosts'

  class NewProject extends Component {

    constructor(props) {
      super(props);
      this.state = {
        projectName: 'New Project',
        projectAddress: '',
        projectValue: 0,
        projectStatus: '',
        projectRooms: [],
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.addRoom = this.addRoom.bind(this);
      this.saveQuote = this.saveQuote.bind(this);
    }

    handleInputChange(event) {
     const target = event.target;
     const value = target.value;
     const name = target.name;

     this.setState({
       [name]: value,
     });
    }

    roomCallBack = (roomData) => {
      const index = roomData.roomNum;
      const projectRooms = this.state.projectRooms;
      projectRooms[index] = roomData;

      this.setState({
        projectRooms: projectRooms
      });
    }

    projectCostEstimate(){
      var cost = 0;
      this.state.projectRooms.map((projectRoom) => {
        cost += Number(projectRoom.cost);
      })
      return cost;
    }

    addRoom(event) {
        const projectRooms = this.state.projectRooms;
        projectRooms[projectRooms.length] = {
          roomNum: projectRooms.length,
          description: '',
          linFootage: 0,
          height: 0,
          constructionMaterial: '',
          quote: 0,
          doorSpecies: '',
          doorStyle: '',
          color: '',
          drawerQty: 4,
          drawerModel: '',
          hardware: '',
          hardwareQty: 0,
          crownMolding: '',
          quoteAccessories: [],
          pendingAccessoryID:'',
          pendingAccessoryQty:0,
          quoteMillworkItems: [],
          pendingMillworkItemID:'',
          pendingMillworkItemQty:0,
          cost:0,
          costBreakdown: {}
        }
      this.setState(function() {
        return {
          projectRooms: projectRooms
        }
      })
    }

    saveQuote(event) {
      event.preventDefault();
      const projectStatus = this.refs.projectStatus.value.trim();
      const projectName = this.refs.projectName.value.trim();
      const projectAddress = this.refs.projectAddress.value.trim();
      const projectValue = this.projectCostEstimate();
      const projectRooms = this.state.projectRooms;

      if (projectName != '' && projectAddress != '') {
        Meteor.call('insertNewQuote',projectStatus,projectName,projectAddress,projectRooms,projectValue);
        this.refs.projectName.value = '';
        this.refs.projectAddress.value = '';
      }
    }

    render() {

      return (
        <div>
          <PageHeader>{this.state.projectName}</PageHeader>
          <div>
            { /*Form Begins*/ }
            <form className='form-horizontal' onSubmit={this.saveQuote.bind(this)}>

              { /*Select Job Status */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Status</label>
                <div className='col-sm-4'>
                  <select className='form-control' name='projectStatus' ref='projectStatus' onChange={this.handleInputChange}>
                    <option value='Quoting'> Quoting </option>
                    <option value='Won'> Won </option>
                    <option value='Lost'> Lost </option>
                  </select>
                </div>
              </div>

              { /*Input Job Name */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Job name</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='projectName' name='projectName' onChange={this.handleInputChange}/>
                </div>
              </div>

              { /*Input Job Address */ }
              <div className='form-group'>
                <label className='col-sm-2 control-label'>Job Address</label>
                <div className='col-sm-4'>
                  <input type='text' className='form-control' ref='projectAddress' name='projectAddress' onChange={this.handleInputChange}/>
                </div>
              </div>

              {this.state.projectRooms.map((projectRoom) => {
                return (
                  <div key={projectRoom.roomNum}>
                    <NewQuote callbackFromProject={this.roomCallBack} roomNum={projectRoom.roomNum}/>
                  </div>
                )
              })}

              <Button block bsSize='large' onClick={this.addRoom}>Add Room</Button>

              <Button block bsSize='large' onClick={this.saveQuote}>Save Quote</Button>
            </form>
          <div>
        </div>
      </div>


      {/*This is a fixed div in the right hand corner of the page that actively calculates the quote before it is submitted to the database */}
      <div className='fixed'>
        <div>
          <h1>Project Cost: ${this.projectCostEstimate()} </h1>
          {this.state.projectRooms.length!=0 && 
          <DisplayCosts breakdown={this.state.projectRooms[0].costBreakdown}/>
          }
        </div>
      </div>

    </div>
      );
    }
  }

  export default createContainer(() => {
    if(Meteor.userId()){
      let materialsSub = Meteor.subscribe('allMaterials');
      let doorStylesSub = Meteor.subscribe('allDoorStyles');
      let colorsSub = Meteor.subscribe('allColors');
      let drawersSub = Meteor.subscribe('allDrawers');
      let hardwareSub = Meteor.subscribe('allHardware');
      let crownMoldingsSub = Meteor.subscribe('allCrownMoldings');
      let operationsSub = Meteor.subscribe('allOperations');
      let quotesSub = Meteor.subscribe('allQuotes');
      let usersSub = Meteor.subscribe('currentUser');
      let accessoriesSub = Meteor.subscribe('allAccessories');
      let millworkItemsSub = Meteor.subscribe('allMillworkItems');
    }

    return {
      materials: Materials.find({}).fetch(),
      doorStyles: DoorStyles.find({}).fetch(),
      colors: Colors.find({}).fetch(),
      drawers: Drawers.find({}).fetch(),
      hardware: Hardware.find({}).fetch(),
      crownMoldings: CrownMoldings.find({}).fetch(),
      operations: Operations.find({}).fetch(),
      accessories: Accessories.find({}).fetch(),
      millworkItems: MillworkItems.find({}).fetch(),
    }
  }, NewProject);

}
