import React from 'react';
import {Link} from 'react-router';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import IsRole from '../utilities/IsRole';
import { createContainer } from 'meteor/react-meteor-data';
import DatabaseLinks from './DatabaseLinks';
import {  Navbar,
          Nav,
          NavDropdown,
          MenuItem,
          NavItem,
          Image,
          Grid,
          Jumbotron} from 'React-Bootstrap';

const MainLayout = (props) =>
  <div className='main-layout'>
    <Navbar inverse collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        <Image src='/PK-logo.png' responsive/>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem><Link to='/newProject'>Create New Project</Link></NavItem>
        <NavItem><Link to='/myQuotes'>My Quotes</Link></NavItem>
        <NavItem><Link to='/cutListGenerator'>Cut-List Generator</Link></NavItem>
        <NavDropdown eventKey={3} title="Database" id="basic-nav-dropdown">
          <DatabaseLinks></DatabaseLinks>
        </NavDropdown>
        <NavItem><LoginButtons></LoginButtons></NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  <Grid className='page-body'>
    {props.children}
  </Grid>
  </div>
;

export default createContainer(() => {
  if(Meteor.userId()){
    let usersSub = Meteor.subscribe('currentUser');
  }

  return {
  }
}, MainLayout);
