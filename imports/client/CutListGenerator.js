import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import AddCutListCabinet from './AddCutListCabinet';
import CabinetList from './CabinetList';
import GenerateCutListCSV from './GenerateCutListCSV';

import Cabinets from '../api/Cabinets';
import Materials from '../api/Materials';

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
    cabinets = this.state.cabinets;
    index = cabinets.length;
    cabinets[index] = cabinetData;
    
    this.setState({
        cabinets: cabinets
    });
}

  render() {
    return (
      <div>
        <div>
          <PageHeader>Cut-List Generator</PageHeader>
          <Panel>
               <AddCutListCabinet cabinets={this.props.cabinets} materials={this.props.materials} addCabinetCallback={this.addCabinetToList}/>
          </Panel>
        </div>

        {/*Display Added Cabinets List*/}
        <Table responsive hover>
            <CabinetList cutListCabinets={this.state.cabinets} />
        </Table>

        {/*Generate Cutlist CSV */}
            <GenerateCutListCSV />
      </div>
    )
  }
}

export default createContainer(() => {
    if(Meteor.userId()){
      let cabinetsSub = Meteor.subscribe('allCabinets');
      let materialsSub = Meteor.subscribe('allMaterials');
    }

    return {
      cabinets: Cabinets.find({}).fetch(),
      materials: Materials.find({}).fetch(),
    }
  }, CutListGenerator);