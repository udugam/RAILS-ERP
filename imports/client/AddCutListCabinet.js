import React, {Component} from 'react';

import {
    FormGroup,
    FormControl,
    ControlLabel,
    Button,
    Grid,
    Row,
    Col,
    Checkbox,
} from 'React-Bootstrap';

import Cabinets from '../api/Cabinets'

export default class AddCutListCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cabNum: "",
            cabCode: "",
            cabWidth: 0,
            cabHeight: 0,
            cabDepth: 0,
            cabMaterial: "",
            drawer: false,
            pantry: false,
            drawerType: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
   
        this.setState({
          [name]: value,
        }, () => {this.drawerCheck(),this.pantryCheck()});
    }

    drawerCheck() {
        if (Cabinets.findOne({code: this.state.cabCode, "constructionParts.partName": "drawerFront"})) {
            this.setState({
                drawer: true,
            });
        } else {
            this.setState({
                drawer: false,
            });
        }    
    }

    pantryCheck() {
        const cabCode = this.state.cabCode
        if (cabCode.includes("P")) {
            this.setState({
                pantry: true,
            });
        } else {
            this.setState({
                pantry: false,
            });
        }    
    }

    render() {
        return (
            <form>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Number*/}
                            <FormGroup>
                                <ControlLabel>Cabinet Number</ControlLabel>
                                <FormControl type="text" name="cabNum" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            {/*Select Cabinet Code */}
                            <FormGroup>
                                <ControlLabel>Cabinet Code</ControlLabel>
                                <FormControl componentClass="select" name="cabCode" onChange={this.handleInputChange}>
                                    <option>...</option>
                                    {this.props.cabinets.map((storedCabinet) => {
                                    return (
                                        <option value={storedCabinet.code} key={storedCabinet._id}>
                                            {storedCabinet.code}
                                        </option>
                                    )
                                    })}
                                </FormControl>
                            </FormGroup>
                        </Col>
                        {/*This section of code will check to see if a cabinet has a drawer, and if so will render so that the user can select the drawer type*/}
                        {this.state.drawer && 
                            <Col xs={6} md={4}>
                                {/*Input Drawer Brand & Type*/}
                                <FormGroup>
                                    <ControlLabel>Drawer Type</ControlLabel>
                                    <FormControl componentClass="select" name="drawerType" onChange={this.handleInputChange}>
                                        <option>...</option>
                                        {this.props.drawers.map((storedDrawer) => {
                                            return (
                                                <option value={storedDrawer.model} key={storedDrawer.model}>
                                                    {storedDrawer.manufacturer}-{storedDrawer.model}
                                                </option>
                                            )
                                        })}
                                    </FormControl>
                                </FormGroup>
                            </Col>
                        }
                        {/*This section of code will check to see if a pantry is selected, and if so will render two fields for the user to set the heights up the upper and lower cabinets*/}
                        {this.state.pantry && 
                            <Col xs={6} md={4}>
                                {/*Input Pantry Cabinet Heights, All pantries are build as two cabinets*/}
                                <FormGroup>
                                    <ControlLabel>Upper Cabinet Height</ControlLabel>
                                    <FormControl type="number" name="pantryUpperHeight" onChange={this.handleInputChange} />
                                    
                                    <ControlLabel>Lower Cabinet Height</ControlLabel>
                                    <FormControl type="number" name="pantryBaseHeight" onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        }
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Width*/}
                            <FormGroup>
                                <ControlLabel>Width (mm)</ControlLabel>
                                <FormControl type="number" name="cabWidth" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        {!this.state.pantry && 
                            <Col xs={6} md={3}>
                                {/*Input Cabinet Height*/}
                                <FormGroup>
                                    <ControlLabel>Height (mm)</ControlLabel>
                                    <FormControl type="number" name="cabHeight" onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        }
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Depth*/}
                            <FormGroup>
                                <ControlLabel>Depth (mm)</ControlLabel>
                                <FormControl type="number" name="cabDepth" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            {/*Select Cabinet Construction Material*/}
                            <FormGroup>
                                <ControlLabel>Cabinet Material</ControlLabel>
                                <FormControl componentClass="select" name="cabMaterial" onChange={this.handleInputChange}>
                                    <option>...</option>
                                    {this.props.materials.map((storedMaterial) => {
                                    return (
                                        <option value={storedMaterial.name} key={storedMaterial._id}>
                                            {storedMaterial.name}
                                        </option>
                                    )
                                    })}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>   
                </Grid>
                <Button block bsSize='large' onClick={() => this.props.addCabinetCallback(this.state)}>Add Cabinet to Cutlist</Button>
            </form>
        );
    }
}