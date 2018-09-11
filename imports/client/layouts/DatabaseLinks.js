import React, {Component} from 'react';
import IsRole from '../utilities/IsRole';
import {Link} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';


class DatabaseLinks extends Component {

  showLinks() {
      return <ul className="nav navbar-nav">
                <li><Link to='/addMaterials'>Materials</Link></li>
                <li><Link to='/addHardware'>Hardware</Link></li>
                <li><Link to='/addDoorStyle'>Door Styles</Link></li>
                <li><Link to='/addCrownMolding'>Crown Molding</Link></li>
                <li><Link to='/addColor'>Colors</Link></li>
                <li><Link to='/addDrawer'>Drawers</Link></li>
                <li><Link to='/addAccessory'>Accessories</Link></li>
                <li><Link to='/addMillworkItem'>Millwork Items</Link></li>
                <li><Link to='/cabinetDatabase'>Cabinets</Link></li>
                <li><Link to='/configureOps'>Operation Settings</Link></li>
              </ul>
  }


  render() {
    if (Meteor.userId()) {
      if (!this.props.ready) {
        return <div>Loading...</div>;
      } else {
        return <div>{this.showLinks()}</div>;
      }
    }
    return <div>Login to Start</div>;
  }
}

export default createContainer(() => {
  if(Meteor.userId()){
    let usersSub = Meteor.subscribe('currentUser');
    return {
      ready: usersSub.ready(),
    }
  }
  return {};
}, DatabaseLinks);
