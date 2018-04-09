import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

import DisplayDoorList from './DisplayDoorList'

export default class DoorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doors:[]
        }
    }

    componentWillReceiveProps(nextProps)
    //create function that takes this.props.cabinets and calculates doors for each cabinets and adds them to the state


    render() {
        return (
        <Panel>
            <DisplayDoorList doors={this.state.doors}/> 
        </Panel>
        )
    }
}