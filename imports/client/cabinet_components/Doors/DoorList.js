import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

import Cabinets from '../../../api/Cabinets'
import DoorStyles from '../../../api/DoorStyles'
import DisplayDoorList from './DisplayDoorList'

const PANEL = 3
const DOOR = 2
const COUNTERTOP = 5

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
                    let doorWidth = 0
                    let dootHeight = 0
                    let doorThickness = 19
                        if (listedCabinet.type==="base" || listedCabinet.type==="vanity") {
                            //add if statement for width of blind corner cabinet doors
                            doorWidth = listedCabinet.panel? listedCabinet.cabWidth/listedPart.partQty-PANEL : listedCabinet.cabWidth/listedPart.partQty-DOOR
                            doorHeight = listedCabinet.cabHeight-COUNTERTOP
                        } else if (listedCabinet.type==="upper" || listedCabinet.type==="pantry") {
                            doorWidth = listedCabinet.panel? listedCabinet.cabWidth/listedPart.partQty-PANEL : listedCabinet.cabWidth/listedPart.partQty-DOOR
                            doorHeight = listedCabinet.cabHeight-DOOR
                        } else if (listedCabinet.type==="baseCorner") {
                            //const doorWidth =
                            //const doorWidth2 =  
                            //const doorHeight = 
                        } else if (listedCabinet.type==="upperCorner") {
                            //const doorWidth =
                            //const doorWidth2 =  
                            //const doorHeight = 
                        } 
                        doorsArray.push({
                            cabNum: listedCabinet.cabNum,
                            width: doorWidth,
                            height: doorHeight,
                            thickness: doorThickness,
                            style: listedCabinet.doorStyle,
                            material: "add Logic",
                            qty: listedPart.partQty})
                        this.setState({
                            doors: doorsArray 
                        })
                        break
                    case 'drawerFront':
                    let drawerWidth = listedCabinet.panel? listedCabinet.cabWidth-PANEL : listedCabinet.cabWidth-DOOR
                    let drawerHeight = listedPart.frontHeight
                    let drawerThickness = 19
                        doorsArray.push({
                            cabNum:listedCabinet.cabNum,
                            width: drawerWidth,
                            height: drawerHeight,
                            thickness: drawerThickness,
                            style: listedCabinet.doorStyle,
                            material: "add logic",
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