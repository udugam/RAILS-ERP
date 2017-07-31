import React from 'react';
import {Link} from 'react-router';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import IsRole from '../utilities/IsRole';
import { createContainer } from 'meteor/react-meteor-data';
import NavLinks from './NavLinks';

const MainLayout = (props) =>

  <div className='main-layout'>
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a className="navbar-brand" href="/">
            <img alt='Brand' src='/PK-logo.png' width='200'/>
          </a>
          <ul className="nav navbar-nav navbar-left">
            <li><LoginButtons /></li>
          </ul>
          <NavLinks></NavLinks>
        </div>
      </div>
    </nav>
    {props.children}
  </div>
;

export default createContainer(() => {
  if(Meteor.userId()){
    let usersSub = Meteor.subscribe('currentUser');
  }

  return {
  }
}, MainLayout);
