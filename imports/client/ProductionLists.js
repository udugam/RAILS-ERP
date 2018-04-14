import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AddCutListCabinet from './AddCutListCabinet';
import CabinetList from './CabinetList';
import GenerateCutListCSV from './GenerateCutListCSV';
import DoorList from './cabinet_components/Doors/DoorList'

import Cabinets from '../api/Cabinets';
import Materials from '../api/Materials';
import Drawers from '../api/Drawers'
import DoorStyles from '../api/DoorStyles'

import {
  PageHeader, 
  Button, 
  Panel, 
  Table,
  FormGroup,
  Tabs,
  Tab,
  ControlLabel,
  FormControl,
  Col
} from 'React-Bootstrap';



class ProductionLists extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cabinets: [],
        panels:[],
        projectName: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    })
  }

  addCabinetToList = (cabinetData) => {
    if (cabinetData.type==="pantry") {
      console.log("Here")
      //create two cabinet data sets and assign each the heights defined by the user
      const lowerCabinetData = Object.assign({},cabinetData)
      lowerCabinetData.cabHeight = cabinetData.pantryBaseHeight
      lowerCabinetData.cabNum = lowerCabinetData.cabNum+"-base"

      const upperCabinetData = Object.assign({},cabinetData)
      upperCabinetData.cabHeight = cabinetData.pantryUpperHeight
      upperCabinetData.cabNum = upperCabinetData.cabNum+"-upper"

      //add two cabinets to array
      cabinets = this.state.cabinets
      index = cabinets.length
      cabinets[index] = lowerCabinetData
      cabinets[index+1] = upperCabinetData
    } else {
      cabinets = this.state.cabinets
      index = cabinets.length
      cabinets[index] = cabinetData
    }
    

    this.setState({
        cabinets: cabinets,
    });
}

  render() {
    return (
      <div>
          <PageHeader>Production-Lists Generator</PageHeader>
          <Panel>
            <Col xs={6} md={4}>
              <FormGroup>
                <ControlLabel>Project Name</ControlLabel>
                <FormControl type="text" name="projectName" onChange={this.handleInputChange} />
              </FormGroup>
            </Col>
          </Panel>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab eventKey={1} title="Cabinets">
              <AddCutListCabinet doorStyles= {this.props.doorStyles} cabinets={this.props.cabinets} materials={this.props.materials} addCabinetCallback={this.addCabinetToList} drawers={this.props.drawers}/>
              {/*Display Added Cabinets List*/}
              <Table responsive hover>
                <CabinetList cutListCabinets={this.state.cabinets} />
              </Table>
              {/*Generate Cutlist CSV */}
              <GenerateCutListCSV projectName={this.state.projectName} cutListCabinets={this.state.cabinets} materials={this.props.materials} />
            </Tab>
            <Tab eventKey={2} title="Panels">
              Tab 2 content
            </Tab>
            <Tab eventKey={3} title="Doors">
              {/*Display Door Lists*/}
              <DoorList cabinets={this.state.cabinets} />
            </Tab>
          </Tabs>
      </div>
    )
  }
}

export default createContainer(() => {
    if(Meteor.userId()){
      let cabinetsSub = Meteor.subscribe('allCabinets')
      let materialsSub = Meteor.subscribe('allMaterials')
      let drawersSub = Meteor.subscribe('allDrawers')
      let doorStylesSub = Meteor.subscribe('allDoorStyles')
    }

    return {
      cabinets: Cabinets.find({}).fetch(),
      materials: Materials.find({}).fetch(),
      drawers: Drawers.find({}).fetch(),
      doorStyles: DoorStyles.find({}).fetch()
    }
  }, ProductionLists);