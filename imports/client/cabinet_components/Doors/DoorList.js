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
        this.generateDoors()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.generateDoors()
        }
    }
    

    generateDoors() {
        const doorsArray = []
        this.props.cabinets.map((listedCabinet) => {
            const cabinet = Cabinets.findOne({code:listedCabinet.cabCode});
            const cabinetParts = cabinet.constructionParts;
            const doorstyle = DoorStyles.findOne({name:listedCabinet.doorStyle});
            cabinet.constructionParts.map((listedPart) => {
                switch(listedPart.partName) {
                    case 'door':
                        doorsArray.push({
                            cabNum: listedCabinet.cabNum,
                            width: listedCabinet.cabWidth/listedPart.partQty-3,
                            height: "add logic",
                            thickness: "add Logic",
                            style: listedCabinet.doorStyle,
                            material: "add Logic",
                            qty: listedPart.partQty})
                        this.setState({
                            doors: doorsArray 
                        })
                        break
                    case 'drawerFront':
                        doorsArray.push({
                            cabNum:listedCabinet.cabNum,
                            width: "600",
                            height: "765",
                            thickness: "19",
                            style: "P100",
                            material: "MDF",
                            qty: listedPart.partQty})
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