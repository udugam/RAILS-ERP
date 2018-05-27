import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

import Cabinets from '../../../api/Cabinets'
import DoorStyles from '../../../api/DoorStyles'
import DisplayDoorList from './DisplayDoorList'
import CsvCreator from 'react-csv-creator';

const PANEL = 3
const DOOR = 2
const COUNTERTOP = 5
const BUMPER = 3
const DOORTHICKNESS = 19
const GABLE_THICKNESS = 19
const ANGLE_45IIHINGE_OVERLAY = 3.5
const ANGLE_NEG45IIIHINGE_OVERLAY = 11.2
const DRW_SPACING = 3

export default class DoorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            doors:[],
            csvDoorList:[]
        }
        this.generateDoors()
        this.generateCSV = this.generateCSV.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.generateDoors()
        }
    }

    addToDoorList(doorsArray,cabNum,width, height, thickness, style, material, qty, programPath) {
        doorsArray.push({
            cabNum: cabNum,
            width: width,
            height: height,
            thickness: thickness,
            style: style,
            material: material,
            qty: qty,
            programPath: programPath
        })
        this.setState({
            doors: doorsArray 
        })
    }
    
    generateDoors() {
        const doorsArray = []
        this.props.cabinets.map((listedCabinet) => {
            const cabinet = Cabinets.findOne({code:listedCabinet.cabCode});
            const cabinetParts = cabinet.constructionParts;
            const doorstyle = DoorStyles.findOne({name:listedCabinet.doorStyle});
            const panel = (listedCabinet.lpanel || listedCabinet.rpanel || listedCabinet.blindPanel) ? true : false //variable to determine if panel exists for door width calculations
            cabinet.constructionParts.map((listedPart) => {
                switch(listedPart.partName) {
                    case 'door':
                    let doorWidth = 0 
                    let doorWidth2 = 0 //variable for corner pie-cuts with bi-fold doors only
                    let doorHeight = 0
                    let doorThickness = 19
                    let doorCalcWidth = (listedCabinet.blindPanel? listedCabinet.doorSpace : listedCabinet.cabWidth) //This variable is assigned either the cabinet width or space for doors if a blind panel exists
                        if (listedCabinet.type==="base" || listedCabinet.type==="vanity") {
                            if (listedCabinet.cabCode==="BER" || listedCabinet.cabCode==="BEL") {
                                doorWidth = Math.floor((Math.SQRT2*listedCabinet.cabWidth)-(Math.SQRT2*GABLE_THICKNESS-ANGLE_45IIHINGE_OVERLAY))
                            } else {
                                doorWidth = panel ? Math.ceil(doorCalcWidth/listedPart.partQty-PANEL) : Math.floor(doorCalcWidth/listedPart.partQty-DOOR)
                            }
                            doorHeight = listedCabinet.cabHeight-COUNTERTOP //Need to add condition for door height calc when drawer is present.
                        } else if (listedCabinet.type==="upper") {
                            if (listedCabinet.cabCode==="WER" || listedCabinet.cabCode==="WEL") {
                                doorWidth = Math.floor((Math.SQRT2*listedCabinet.cabWidth)-(Math.SQRT2*GABLE_THICKNESS-ANGLE_NEG45IIIHINGE_OVERLAY))
                            } else {
                                doorWidth = panel ? Math.ceil(doorCalcWidth/listedPart.partQty-PANEL) : Math.floor(doorCalcWidth/listedPart.partQty-DOOR)
                            }
                            doorHeight = listedCabinet.cabHeight-DOOR
                        } else if (listedCabinet.type==="baseCorner") {
                            doorWidth = Math.floor(listedCabinet.cabWidth-listedCabinet.cabDepth-DOORTHICKNESS-BUMPER-1)
                            doorWidth2 = Math.floor(listedCabinet.cabWidth2-listedCabinet.cabDepth-DOORTHICKNESS-BUMPER-1) 
                            doorHeight = listedCabinet.cabHeight-COUNTERTOP
                            if (doorWidth !== doorWidth2) {
                                listedPart.partQty = 1
                                this.addToDoorList(doorsArray,listedCabinet.cabNum,doorWidth2,doorHeight,doorThickness,listedCabinet.doorStyle,"add material logic",listedPart.partQty, doorstyle.programPath)
                            }
                        } else if (listedCabinet.type==="upperCorner") {
                            if(listedCabinet.cabCode==="WAL" || listedCabinet.cabCode==="WAR"){
                                doorWidth = Math.floor(Math.sqrt( Math.pow(listedCabinet.cabWidth,2)+Math.pow(listedCabinet.cabWidth2,2)+(2*Math.pow(listedCabinet.cabDepth,2))+
                                (2*Math.pow(GABLE_THICKNESS,2))+(4*GABLE_THICKNESS*listedCabinet.cabDepth)-(2*listedCabinet.cabWidth2*listedCabinet.cabDepth)-
                                (2*listedCabinet.cabWidth2*GABLE_THICKNESS)-(2*listedCabinet.cabWidth*listedCabinet.cabDepth)-(2*listedCabinet.cabWidth*GABLE_THICKNESS) ) )
                            } else {
                                doorWidth = Math.floor(listedCabinet.cabWidth-listedCabinet.cabDepth-DOORTHICKNESS-BUMPER-1)
                                doorWidth2 = Math.floor(listedCabinet.cabWidth2-listedCabinet.cabDepth-DOORTHICKNESS-BUMPER-1) 
                                doorHeight = listedCabinet.cabHeight-DOOR
                                if (doorWidth !== doorWidth2) {
                                    listedPart.partQty = 1
                                    this.addToDoorList(doorsArray,listedCabinet.cabNum,doorWidth2,doorHeight,doorThickness,listedCabinet.doorStyle,"add material logic",listedPart.partQty, doorstyle.programPath)
                                }
                            }
                        } else if (listedCabinet.type==="pantry") {
                            listedPart.partQty = listedPart.partQty/2
                            doorWidth = panel ? Math.ceil(doorCalcWidth/listedPart.partQty-PANEL) : Math.floor(doorCalcWidth/listedPart.partQty-DOOR)
                            doorHeight = listedCabinet.cabHeight-DOOR
                        }
                        this.addToDoorList(doorsArray,listedCabinet.cabNum,doorWidth,doorHeight,doorThickness,listedCabinet.doorStyle,"add material logic",listedPart.partQty, doorstyle.programPath)
                        break
                    case 'drawerFront':
                    let drawerWidth = panel ? Math.ceil(listedCabinet.cabWidth-PANEL) : Math.floor(listedCabinet.cabWidth-DOOR)
                    let drawerHeight = listedPart.frontHeight
                    let drawerThickness = 19
                    this.addToDoorList(doorsArray,listedCabinet.cabNum,drawerWidth,drawerHeight,drawerThickness,listedCabinet.doorStyle,"add material logic",listedPart.partQty, doorstyle.programPath)
                        break
                    default:
                }
            })
        })
    }


    generateCSV() {
        doorsArray = this.state.doors
        doorsArray.map((listedDoor)=> {
            let listedCSVDoor = [
                listedDoor.cabNum,
                '',
                '',
                listedDoor.qty,
                '0',
                listedDoor.height,
                listedDoor.width,
                listedDoor.thickness,
                '',
                '0',
                listedDoor.programPath,
            ]

            csvDoorList = this.state.csvDoorList;
            index = csvDoorList.length;
            csvDoorList[index] = listedCSVDoor;
            
            this.setState({
                csvDoorList: csvDoorList
            });
        })
    }

    render() {
        return (
        <Panel>
            <DisplayDoorList doors={this.state.doors}/>
            <Button block bsSize='large' bsStyle="success" onClick={this.generateCSV}>Generate CSV</Button> 
            <CsvCreator filename={this.props.projectName+'-Doors'} noHeader={true} rows={this.state.csvDoorList}>
                <p>Download CSV</p>
            </CsvCreator>
        </Panel>
        )
    }
}