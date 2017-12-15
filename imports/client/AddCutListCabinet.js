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

export default class AddCutListCabinet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cabCode: "",
            cabWidth: 0,
            cabHeight: 0,
            cabDepth: 0,
            cabMaterial: "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
   
        this.setState({
          [name]: value,
        });
    }

    render() {
        return (
            <form>
                <Grid>
                    <Row>
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
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Width*/}
                            <FormGroup>
                                <ControlLabel>Width (mm)</ControlLabel>
                                <FormControl type="number" name="cabWidth" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            {/*Input Cabinet Height*/}
                            <FormGroup>
                                <ControlLabel>Height (mm)</ControlLabel>
                                <FormControl type="number" name="cabHeight" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
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