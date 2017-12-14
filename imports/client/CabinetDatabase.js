import React, {Component} from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Cabinets from '../api/Cabinets';
import AddNewCabinet from './AddNewCabinet';


import {
  PageHeader, 
  Button, 
  Panel, 
  Table,
  FormGroup,
} from 'React-Bootstrap';

class CabinetDatabase extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  addCabinet(event) {
    event.preventDefault();
    const cabinetCode = this.refs.code.value.trim();
    const description = this.refs.description.value.trim();
    const parts = this.refs.parts.value.trim();

    if (cabinetCode != '') {
      Meteor.call('insertNewCabinet',cabinetCode,description,parts);
    }
  }


  render() {
    return (
      <div>
        <div>
          <PageHeader>Cabinet Database</PageHeader>
          <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
            Add New Cabinet
          </Button>
          <Panel collapsible expanded={this.state.open}>
            <AddNewCabinet />
          </Panel>
        </div>

        {/*Display Cabinets List*/}
        <Table responsive hover>
          <tbody>
            <tr>
              <th>Cabinet Code</th>
              <th>Description</th>
            </tr>
            {this.props.cabinets.map((storedCabinet) => {
                return (
                  <tr key={storedCabinet._id}>
                    <td>{storedCabinet.code}</td>
                    <td>{storedCabinet.description}</td>
                  </tr>
                )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

export default createContainer(() => {
  if(Meteor.userId()){
    let cabinetsSub = Meteor.subscribe('allCabinets');
  }

  return {
    cabinets: Cabinets.find({}).fetch(),
  }
}, CabinetDatabase);
