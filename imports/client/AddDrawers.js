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

export default class AddDrawers extends Component {
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
            <div>Add Drawers</div>
        );
    }
}