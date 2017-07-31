import React, {Component} from 'react';
import IsRole from '../utilities/IsRole';
import {Link} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';



class NavLinks extends Component {

  showAdminLinks() {
    if (Roles.userIsInRole(Meteor.userId(), 'admin')) {
      return <ul className="nav navbar-nav">
                <li><Link to='/newQuote'>Create New Quote</Link></li>
                <li><Link to='/myQuotes'>My Quotes</Link></li>
                <li><Link to='/addMaterials'>Materials</Link></li>
                <li><Link to='/addHardware'>Hardware</Link></li>
                <li><Link to='/addDoorStyle'>Door Styles</Link></li>
                <li><Link to='/addCrownMolding'>Crown Molding</Link></li>
                <li><Link to='/addColor'>Colors</Link></li>
                <li><Link to='/addDrawer'>Drawers</Link></li>
                <li><Link to='/configureOps'>Operation Settings</Link></li>
              </ul>
    } else {
      return  null
    }
  }


  render() {
    return (
      <div>{this.showAdminLinks()}</div>
    );
  }
}

export default createContainer(() => {
  if(Meteor.userId()){
    let usersSub = Meteor.subscribe('currentUser');
  }

  return {
  }
}, NavLinks);
