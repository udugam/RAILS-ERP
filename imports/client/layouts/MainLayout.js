import React, {Component} from 'react';
import {Link} from 'react-router';
import { LoginButtons } from 'meteor/okgrow:accounts-ui-react';
import IsRole from '../utilities/IsRole';
import { createContainer } from 'meteor/react-meteor-data';
import DatabaseLinks from './DatabaseLinks';
import ProductionLinks from './ProductionLinks'
import {  Navbar,
          Nav,
          NavDropdown,
          MenuItem,
          NavItem,
          Image,
          Grid,
          Jumbotron,
          Modal,
          Button,
          Clearfix} from 'React-Bootstrap';

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show:false
    }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.loginStatus = this.loginStatus.bind(this);
  }

  loginStatus() {
    if(Meteor.userId()) {
      return false
    } else {
      return true
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return(
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
            {Roles.userIsInRole(Meteor.userId(), 'salesAssociate') &&
            <NavDropdown eventKey={2} title="Sales" id="basic-nav-dropdown">            
              <NavItem><Link to='/newProject'>Create New Project</Link></NavItem>
              <NavItem><Link to='/myQuotes'>My Quotes</Link></NavItem>
            </NavDropdown>
            }
            {Roles.userIsInRole(Meteor.userId(), 'productionAssociate') &&
            <NavDropdown eventKey={2} title="Production" id="basic-nav-dropdown">
              <ProductionLinks></ProductionLinks>
            </NavDropdown>
            }
            {Roles.userIsInRole(Meteor.userId(), 'purchasingAssociate') &&
            <NavDropdown eventKey={3} title="Database" id="basic-nav-dropdown">
              <DatabaseLinks></DatabaseLinks>
            </NavDropdown>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Grid className='page-body'>
        {this.props.children}
      </Grid>
      <Modal bsSize="small" show={this.loginStatus()} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LoginButtons visible/>
            <div id="loginModalSpacer"></div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default createContainer(() => {
  if(Meteor.userId()){
    let usersSub = Meteor.subscribe('currentUser');
    return {
      ready: usersSub.ready(),
    }
  }
  return {} 
}, MainLayout);
