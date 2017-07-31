import React, {Component, PropTypes} from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import NewMaterial from './NewMaterial';
import NewQuote from './NewQuote';
import NewDoorStyle from './NewDoorStyle';
import NewColor from './NewColor';
import NewDrawer from './NewDrawer';
import NewHardware from './NewHardware';
import NewCrownMolding from './NewCrownMolding';
import ConfigureOps from './ConfigureOps';

import Quotes from '../api/Quotes';
import Materials from '../api/Materials';
import DoorStyles from '../api/DoorStyles';
import Colors from '../api/Colors';
import Drawers from '../api/Drawers';
import Hardware from '../api/Hardware';
import CrownMoldings from '../api/CrownMoldings';
import Operations from '../api/Operations';



if (Meteor.isDevelopment) {
  window.Quotes = Quotes;
  window.Materials = Materials;
  window.DoorStyles = DoorStyles;
  window.Drawers = Drawers;
  window.Hardware = Hardware;
  window.CrownMoldings = CrownMoldings;
  window.Operations = Operations;
}


class App extends Component {

  render() {
    return (
      <div>
        <main>
          <div>
              {/*<NewMaterial materials={this.props.materials} /> */}
              {/*<NewQuote crownMoldings={this.props.crownMoldings} materials={this.props.materials} doorStyles={this.props.doorStyles} colors={this.props.colors} drawers={this.props.drawers} hardware={this.props.hardware} operations={this.props.operations}/> */}
              {/*<NewDoorStyle doorStyles={this.props.doorStyles} />*/}
              {/*<NewColor colors={this.props.colors}/>*/}
              {/*<NewDrawer drawers={this.props.drawers} />*/}
              {/*<NewHardware hardware={this.props.hardware}/> */}
              {/*<NewCrownMolding crownMoldings={this.props.crownMoldings}/>*/}
              {/*<ConfigureOps operations={this.props.operations}/>*/}
          </div>
        </main>
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
  }

  return {
    materials: Materials.find({}).fetch(),
    doorStyles: DoorStyles.find({}).fetch(),
    colors: Colors.find({}).fetch(),
    drawers: Drawers.find({}).fetch(),
    hardware: Hardware.find({}).fetch(),
    crownMoldings: CrownMoldings.find({}).fetch(),
    operations: Operations.find({}).fetch(),
  }
}, App);
