import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

import Cabinets from '../../../api/Cabinets'
import DoorStyles from '../../../api/DoorStyles'
import DisplayDoorList from './DisplayDoorList'

export default class DoorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doors:[]
        }
    }

    componentWillReceiveProps(nextProps) {
        this.generateDoors()
    }
    

    generateDoors() {
        this.props.cabinets.map((listedCabinet) => {
            let cabinet = Cabinets.findOne({code:listedCabinet.cabCode});
            let cabinetParts = cabinet.constructionParts;
            let doorstyle = DoorStyles.findOne({name:listedCabinet.doorStyle});
            cabinet.constructionParts.map((listedPart) => {
                switch(listedPart.partName) {
                    case 'door':
                        doorsArray = this.state.doors
                        doorsArray.push({
                            cabNum:"1",
                            width: "450",
                            height: "765",
                            thickness: "19",
                            style: "P100",
                            material: "MDF"})
                        this.setState({
                            doors: doorsArray 
                        })
                        break
                    case 'drawerFront':
                        doorsArray.push({
                            cabNum:"2",
                            width: "600",
                            height: "765",
                            thickness: "19",
                            style: "P100",
                            material: "MDF"})
                        this.setState({
                            doors: doorsArray 
                        })
                        break
                    default:
                }
            })
        })
    }

    render() {
        return (
        <Panel>
            <DisplayDoorList doors={this.state.doors}/> 
        </Panel>
        )
    }
}