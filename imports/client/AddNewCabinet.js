import React, {Component} from 'react';
import Cabinets from '../api/Cabinets';
import CabinetPartsList from './CabinetPartsList';
import AddCabinetPart from './AddCabinetPart';

import {
    FormGroup,
    FormControl,
    ControlLabel,
    Grid,
    Row,
    Col,
    Button
} from 'React-Bootstrap';

export default class AddNewCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            code: "",
            description: "",
            constructionParts: [],
            hardwareParts: [],
            cabWidth: 0,
            cabDepth: 0,
            cabHeight: 0,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
      }

     //The State of the new cabinet will live here until it is added to the database
     //All inputs and selections will be made in this component and child components with callbacks to set state
     
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
   
        this.setState({
          [name]: value,
        });
    }

    addPart = (partData) => {
        constructionParts = this.state.constructionParts;
        index = constructionParts.length;
        constructionParts[index] = partData;
        
        this.setState({
            constructionParts: constructionParts
        });
    }

    addCabinet() {
        const code = this.state.code;
        const description = this.state.description;
        const constructionParts = this.state.constructionParts;
        const hardwareParts = this.state.hardwareParts;
        const cabWidth = this.state.cabWidth; 
        const cabDepth = this.state.cabDepth;
        const cabHeight = this.state.cabHeight;
    
        if (code != '') {
          Meteor.call('insertNewCabinet',code,description,constructionParts,hardwareParts,cabWidth,cabDepth,cabHeight);
        }
    }

    render() {
        return (
            <form>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Code */}
                            <FormGroup>
                                <ControlLabel>Cabinet Code</ControlLabel>
                                <FormControl type="text" name="code" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Description*/}
                            <FormGroup>
                                <ControlLabel>Description</ControlLabel>
                                <FormControl type="text" name="description" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>

                    {/*Add Cabinet Parts*/}
                    <ControlLabel>Add Cabinet Parts</ControlLabel>
                    <AddCabinetPart addPartCallback={this.addPart} />

                    {/*Display Added Cabinet Parts*/}
                    <CabinetPartsList parts={this.state.constructionParts} />

                    {/*Add Cabinet to Database*/}
                    <Button block bsSize='large' onClick={() => this.addCabinet()}>Add Cabinet</Button>
                </Grid>
            </form> 
        )
    }
}