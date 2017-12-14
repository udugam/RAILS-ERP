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

export default class NewCabinetPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partName: "",
            partLengthEquation: "",
            partLength: 0,
            partWidthEquation: "",
            partWidth: 0,
            partThickness: "t",
            partCustomThickness: false,
            partProgramPath: "",
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
                            {/*Select Part Name */}
                            <FormGroup>
                                <ControlLabel>Part Name</ControlLabel>
                                <FormControl componentClass="select" name="partName" onChange={this.handleInputChange}>
                                    <option>...</option>
                                    <option value="lGable">Left Gable</option>
                                    <option value="rGable">Right Gable</option>
                                    <option value="bottom">Bottom</option>
                                    <option value="stretcher">Stretcher</option>
                                    <option value="back">Back</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            {/*Input Length Equation*/}
                            <FormGroup>
                                <ControlLabel>Length Equation</ControlLabel>
                                <FormControl type="text" name="partLength" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            {/*Input Width Equation*/}
                            <FormGroup>
                                <ControlLabel>Width Equation</ControlLabel>
                                <FormControl type="text" name="partWidth" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={3}>
                            {/*Input Thickness*/}
                            <FormGroup>
                                <ControlLabel>Thickness</ControlLabel>
                                {this.state.partCustomThickness? (
                                    <FormControl type="number" name="partThickness" onChange={this.handleInputChange} />
                                ) : (
                                    <Checkbox checked disabled>
                                        Same as Cabinet Material
                                    </Checkbox> 
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            {/*Input Program Path*/}
                            <FormGroup>
                                <ControlLabel>Program Path for Part</ControlLabel>
                                <FormControl type="text" name="partProgramPath" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>   
                </Grid>
                <Button block bsSize='large' onClick={() => this.props.addPartCallback(this.state)}>Add Part</Button>
            </form>
        );
    }
}
