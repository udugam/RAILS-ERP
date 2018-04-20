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
    Panel
} from 'React-Bootstrap';

import Cabinets from '../api/Cabinets'

export default class AddCutListCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cabNum: 1,
            cabCode: "",
            cabWidth: 0,
            cabHeight: 0,
            cabDepth: 0,
            cabMaterial: "",
            cabType: "",
            type: "",
            overrideDims: false,
            lpanel: false,
            rpanel: false,
            rearCleat: false,
            lineBore: false,
            shelfSleeves: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
   
        this.setState({
          [name]: value,
        }, () => {this.drawerCheck(),this.cabTypeCheck()});
    }

    handleCheckboxChange(checked, name) {
        this.setState({
            [name]: checked,
        })
    }

    handleAddCabinet() {
        console.log("here")
        this.props.addCabinetCallback(this.state)
        const nextCabNum = this.state.cabNum+1
        this.setState({
            cabNum: nextCabNum,
        })
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

    cabTypeCheck() {
        const cabCode = this.state.cabCode
        const cabinet = Cabinets.findOne({code: cabCode})
        if (cabinet) {
            if (cabinet.type==="pantry" && !this.state.overrideDims) {
                this.setState({
                    type: "pantry",
                    cabDepth: 600
                });
            } else if (cabinet.type==="base" && !this.state.overrideDims) {
                this.setState({
                    type: "base",
                    cabHeight: 770,
                    cabDepth: 600,
                })
            } else if (cabinet.type==="vanity" && !this.state.overrideDims) {
                this.setState({
                    type: "vanity",
                    cabHeight: 680,
                    cabDepth: 540,
                })
            } else if (cabinet.type==="upper" && !this.state.overrideDims) {
                this.setState({
                    type: "upper",
                    cabDepth: 305,
                });
            } else if (cabinet.type==="baseCorner") {
                this.setState({
                    type: "baseCorner",
                    cabHeight: 770,
                    cabDepth: 600
                });
            } else if (cabinet.type==="upperCorner") {
                this.setState({
                    type: "upperCorner",
                    cabDepth: 305
                });
            } else {
                this.setState({
                    type: cabinet.type
                });
            }
        } else {
            this.setState({
                type: ""
            });
        }

    }

    render() {
        return (
            <Panel>
                <Grid>
                    <Row>
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Number*/}
                            <FormGroup>
                                <ControlLabel>Cabinet Number</ControlLabel>
                                <FormControl type="number" name="cabNum" placeholder={this.state.cabNum} onChange={this.handleInputChange} />
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
                        {this.state.type==="pantry" && 
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
                        {(this.state.type==="baseCorner" || this.state.type==="upperCorner") && 
                            <Col xs={6} md={4}>
                                {/*Input Second Cabinet Width for corner cabinets*/}
                                <FormGroup>
                                    <ControlLabel>Width 2</ControlLabel>
                                    <FormControl type="number" name="cabWidth2" onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        }
                        {((this.state.overrideDims || this.state.type==="upper") && this.state.type!=="pantry") && 
                            <Col xs={6} md={3}>
                                {/*Input Cabinet Height*/}
                                <FormGroup>
                                    <ControlLabel>Height (mm)</ControlLabel>
                                    <FormControl type="number" name="cabHeight" placeholder={this.state.cabHeight} onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        }
                        {this.state.overrideDims && 
                            <Col xs={6} md={3}>
                            {/*Input Cabinet Depth*/}
                                <FormGroup>
                                    <ControlLabel>Depth (mm)</ControlLabel>
                                    <FormControl type="number" name="cabDepth" placeholder={this.state.cabDepth} onChange={this.handleInputChange} />
                                </FormGroup>
                            </Col>
                        }
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col xs={6} md={4}>
                                {/*Select to overide standard Dimensions*/}
                                <Checkbox onClick={e => this.handleCheckboxChange(e.target.checked, "overrideDims")}>Override Dimensions</Checkbox>
                            </Col>
                            <Col xs={6} md={4}>
                                {this.state.type==="upper" && 
                                    <div>
                                    {/*Select to inset backs for rear cleat for hanging*/}
                                        <Checkbox onClick={e => this.handleCheckboxChange(e.target.checked, "rearCleat")}>Inset Back for Rear Cleat</Checkbox>
                                        <Checkbox onClick={e => this.handleCheckboxChange(e.target.checked, "lineBore")}>Line Bore Shelf Holes</Checkbox>
                                    </div>
                                }
                                {/*Indicate if Larger Shelf Holes are needed for Sleeves and Pins*/}
                                <Checkbox onClick={e => this.handleCheckboxChange(e.target.checked, "shelfSleeves")}>Shelf Hole Sleeves</Checkbox>
                                {/*Indicate if a Panel exists on either side of Cabinet*/}
                                <Checkbox onClick={e => this.handleCheckboxChange(e.target.checked, "lpanel")}>Left Panel</Checkbox>
                                <Checkbox onClick={e => this.handleCheckboxChange(e.target.checked, "rpanel")}>Right Panel</Checkbox>
                            </Col>
                        </FormGroup>
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
                    <Row>
                        <Col xs={6} md={4}>
                            {/*Select DoorStyle*/}
                            <FormGroup>
                                <ControlLabel>Doorstyle</ControlLabel>
                                <FormControl componentClass="select" name="doorStyle" onChange={this.handleInputChange}>
                                    <option>...</option>
                                    {this.props.doorStyles.map((storedDoorStyle) => {
                                    return (
                                        <option value={storedDoorStyle.name} key={storedDoorStyle._id}>
                                            {storedDoorStyle.name}
                                        </option>
                                    )
                                    })}
                                </FormControl>
                            </FormGroup>
                        </Col>
                    </Row>   
                </Grid>
                <Button block bsSize='large' onClick={() => this.handleAddCabinet()}>Add Cabinet to Cutlist</Button>
            </Panel>
        );
    }
}