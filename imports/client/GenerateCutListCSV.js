import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';
import Cabinets from '../api/Cabinets';
import Materials from '../api/Materials';
import CsvCreator from 'react-csv-creator';

const rearCleatThickness = 19

export default class GenerateCutListCSV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partList: [],
        }
        this.populatePartList = this.populatePartList.bind(this);
        this.updateCSV = this.updateCSV.bind(this);
    }

    populatePartList() {
        this.props.cutListCabinets.map((listedCabinet) => {
            let cabinet = Cabinets.findOne({code:listedCabinet.cabCode});
            let cabinetParts = cabinet.constructionParts;
            let material = Materials.findOne({name:listedCabinet.cabMaterial});
            cabinet.constructionParts.map((listedPart) => {
                switch(listedPart.partName) {
                    case 'lGable':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabDepth-listedPart.partThickness;
                        if (listedCabinet.drawer===true) {
                            listedPart.partProgramPath = listedPart.partProgramPath+listedCabinet.cabCode+"-"+listedPart.partName+"-"+listedCabinet.drawerType+".pgmx"
                        }
                        if (listedCabinet.rearCleat===true) {
                            const originalProgramPath = listedPart.partProgramPath
                            const slicedProgramPath = originalProgramPath.slice(0,-5)
                            const newProgramPath = slicedProgramPath+"-rearCleat"+".pgmx"
                            listedPart.partProgramPath = newProgramPath
                            listedPart.partWidth = listedCabinet.cabDepth
                        }
                        if (listedCabinet.lineBore===true) {
                            const originalProgramPath = listedPart.partProgramPath
                            const slicedProgramPath = originalProgramPath.slice(0,-5)
                            const newProgramPath = slicedProgramPath+"-lineBore"+".pgmx"
                            listedPart.partProgramPath = newProgramPath
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'rGable':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabDepth-listedPart.partThickness;
                        if (listedCabinet.drawer===true) {
                            listedPart.partProgramPath = listedPart.partProgramPath+listedCabinet.cabCode+"-"+listedPart.partName+"-"+listedCabinet.drawerType+".pgmx"
                        }
                        if (listedCabinet.rearCleat===true) {
                            const originalProgramPath = listedPart.partProgramPath
                            const slicedProgramPath = originalProgramPath.slice(0,-5)
                            const newProgramPath = slicedProgramPath+"-rearCleat"+".pgmx"
                            listedPart.partProgramPath = newProgramPath
                            listedPart.partWidth = listedCabinet.cabDepth
                        }
                        if (listedCabinet.lineBore===true) {
                            const originalProgramPath = listedPart.partProgramPath
                            const slicedProgramPath = originalProgramPath.slice(0,-5)
                            const newProgramPath = slicedProgramPath+"-lineBore"+".pgmx"
                            listedPart.partProgramPath = newProgramPath
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum)
                        break
                    case 'stretcher':
                        listedPart.partThickness = material.thickness
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness)
                        listedPart.partWidth = 100
                        this.updateCSV(listedPart,listedCabinet.cabNum)
                        break
                    case 'bottom':
                        listedPart.partThickness = material.thickness
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness)
                        if (listedCabinet.type==="upperCorner" || listedCabinet.type==="baseCorner") {
                            listedPart.partWidth = listedCabinet.cabWidth2-(2*material.thickness)
                        } else if (listedCabinet.rearCleat===true) {
                            listedPart.partWidth = listedCabinet.cabDepth
                        } else {
                            listedPart.partWidth = listedCabinet.cabDepth-material.thickness
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum)
                        break
                    case 'top':
                        listedPart.partThickness = material.thickness
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness)
                        if (listedCabinet.type==="upperCorner" || listedCabinet.type==="baseCorner") {
                            listedPart.partWidth = listedCabinet.cabWidth2-(2*material.thickness)
                        } else if (listedCabinet.rearCleat===true) {
                            listedPart.partWidth = listedCabinet.cabDepth-material.thickness-rearCleatThickness
                        } else {
                            listedPart.partWidth = listedCabinet.cabDepth-material.thickness
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum)
                        break
                    case 'back':
                        listedPart.partThickness = material.thickness
                        listedPart.partWidth = listedCabinet.cabWidth
                        if (listedCabinet.rearCleat===true) {
                            listedPart.partLength = listedCabinet.cabHeight-material.thickness
                            const originalProgramPath = listedPart.partProgramPath
                            const slicedProgramPath = originalProgramPath.slice(0,-5)
                            const newProgramPath = slicedProgramPath+"-rearCleat"+".pgmx"
                            listedPart.partProgramPath = newProgramPath
                        } else {
                            listedPart.partLength = listedCabinet.cabHeight
                        }
                        
                        //This condition checks if the cabinet is a corner cabinet and adds two backs of different sizes to the cutlist
                        if (listedCabinet.type==="upperCorner" || listedCabinet.type==="baseCorner") {
                            listedPart.partQty = 1
                            const listedPart2 = Object.assign({},listedPart)
                            listedPart2.partWidth = listedCabinet.cabWidth2-material.thickness
                            this.updateCSV(listedPart,listedCabinet.cabNum)
                            this.updateCSV(listedPart2,listedCabinet.cabNum)
                        } else {
                            this.updateCSV(listedPart,listedCabinet.cabNum)
                        }
                        break
                    case 'shelf':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness)-5;
                        if (listedCabinet.type==="upperCorner" || listedCabinet.type==="baseCorner") {
                            listedPart.partWidth = listedCabinet.cabWidth2-(2*material.thickness)-5
                        } else if (listedCabinet.rearCleat===true) {
                            listedPart.partWidth = listedCabinet.cabDepth-material.thickness-7-rearCleatThickness;
                        } else {
                            listedPart.partWidth = listedCabinet.cabDepth-material.thickness-7;
                        }

                        //Shelf Quantity Calculation
                        if (listedCabinet.type==="base" || listedCabinet.type==="baseCorner") {
                            listedPart.partQty = 1
                        } else {
                            listedPart.partQty = Math.round(listedCabinet.cabHeight/250)-1
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'fixedShelf':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness);
                        listedPart.partWidth = listedCabinet.cabDepth-material.thickness;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'drwBoxSide':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabDepth;
                        listedPart.partWidth = listedCabinet.cabHeight;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'drwBoxFace':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(4*material.thickness)-26.4;
                        listedPart.partWidth = listedCabinet.cabHeight;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'drwBoxBottom':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(4*material.thickness)-26.4;
                        listedPart.partWidth = listedCabinet.cabDepth-(2*material.thickness);
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'drawerFront':
                        //if metal drawer, then create file name for metal drawer pieces
                        //if wood drawer, then create file name for wood drawer pieces
                        break
                    case 'blindPanel':
                        listedPart.partThickness = material.thickness
                        listedPart.partLength = listedCabinet.cabHeight
                        if (listedCabinet.type==="upper") {
                            listedPart.partWidth = 260
                            listedPart.partLength = listedCabinet.cabHeight
                        } else if (listedCabinet.type==="base") {
                            listedPart.partWidth = 560
                            listedPart.partLength = listedCabinet.cabHeight
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    default:
                        console.log("Part Does Not Exist"); 
                }
            })
        })
    }

    updateCSV(listedPart,cabNum) {
        let listedCSVPart = [
            cabNum+"-"+listedPart.partName,
            '',
            '',
            listedPart.partQty,
            '0',
            listedPart.partLength,
            listedPart.partWidth,
            listedPart.partThickness,
            '',
            '0',
            listedPart.partProgramPath,
        ]

        partList = this.state.partList;
        index = partList.length;
        partList[index] = listedCSVPart;
        
        this.setState({
            partList: partList
        });
    }

    render() {
        return (
        <div>
            <Button block bsSize='large' bsStyle="success" onClick={this.populatePartList}>Generate CSV</Button> 
            <CsvCreator filename='cutlist' noHeader={true} rows={this.state.partList}>
                <p>Download CSV</p>
            </CsvCreator>
        </div>
        )
    }
}