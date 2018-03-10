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

export default class AddCabinetPart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partName: "",
            partLength: 0,
            partWidth: 0,
            partThickness: 0,
            partQty: 1,
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
                                    <option value="top">Top</option>
                                    <option value="stretcher">Stretcher</option>
                                    <option value="back">Back</option>
                                    <option value="shelf">Shelf</option>
                                    <option value="fixedShelf">Fixed Shelf</option>
                                    <option value="drwBoxSide">Drawer Box Side</option>
                                    <option value="drwBoxFace">Drawer Box Front/Back</option>
                                    <option value="drwBoxBottom">Drawer Box Bottom</option>
                                </FormControl>
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={4}>
                            {/*Input Program Path*/}
                            <FormGroup>
                                <ControlLabel>Program Path for Part</ControlLabel>
                                <FormControl type="text" name="partProgramPath" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                        <Col xs={6} md={4}>
                            {/*Input Quantity*/}
                            <FormGroup>
                                <ControlLabel>Quantity</ControlLabel>
                                <FormControl type="number" name="partQty" placeholder="1" onChange={this.handleInputChange} />
                            </FormGroup>
                        </Col>
                    </Row>   
                </Grid>
                <Button block bsSize='large' onClick={() => this.props.addPartCallback(this.state)}>Add Part</Button>
            </form>
        );
    }
}
