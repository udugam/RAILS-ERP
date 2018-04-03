import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AddCutListCabinet from './AddCutListCabinet';
import CabinetList from './CabinetList';
import GenerateCutListCSV from './GenerateCutListCSV';

import Cabinets from '../api/Cabinets';
import Materials from '../api/Materials';
import Drawers from '../api/Drawers'

import {
  PageHeader, 
  Button, 
  Panel, 
  Table,
  FormGroup,
} from 'React-Bootstrap';



class CutListGenerator extends Component {

  constructor(props) {
    super(props);
    this.state = {
        cabinets: [],
    };
  }

  addCabinetToList = (cabinetData) => {
    if (cabinetData.pantry===true) {

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
      cabinets = this.state.cabinets;
      index = cabinets.length;
      cabinets[index] = cabinetData;  
    }
    

    this.setState({
        cabinets: cabinets
    });
}

  render() {
    return (
      <div>
        <div>
          <PageHeader>Production-Lists Generator</PageHeader>
          <Panel>
               <AddCutListCabinet cabinets={this.props.cabinets} materials={this.props.materials} addCabinetCallback={this.addCabinetToList} drawers={this.props.drawers}/>
          </Panel>
        </div>

        {/*Display Added Cabinets List*/}
        <Table responsive hover>
            <CabinetList cutListCabinets={this.state.cabinets} />
        </Table>

        {/*Generate Cutlist CSV */}
            <GenerateCutListCSV cutListCabinets={this.state.cabinets} materials={this.props.materials} />
      </div>
    )
  }
}

export default createContainer(() => {
    if(Meteor.userId()){
      let cabinetsSub = Meteor.subscribe('allCabinets')
      let materialsSub = Meteor.subscribe('allMaterials')
      let drawersSub = Meteor.subscribe('allDrawers')
    }

    return {
      cabinets: Cabinets.find({}).fetch(),
      materials: Materials.find({}).fetch(),
      drawers: Drawers.find({}).fetch()
    }
  }, CutListGenerator);