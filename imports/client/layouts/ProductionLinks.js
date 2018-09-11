import React, {Component} from 'react';
import IsRole from '../utilities/IsRole';
import {Link} from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';


class ProductionLinks extends Component {

  showLinks() {
      return <ul className="nav navbar-nav">
                <li><Link to='/createProject'>Create New Project</Link></li>
                <li><Link to='/viewProjects'>Projects</Link></li>
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
}, ProductionLinks);
