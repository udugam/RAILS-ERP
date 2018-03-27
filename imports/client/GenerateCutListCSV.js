import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';
import Cabinets from '../api/Cabinets';
import Materials from '../api/Materials';
import CsvCreator from 'react-csv-creator';

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
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'rGable':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabDepth-listedPart.partThickness;
                        if (listedCabinet.drawer===true) {
                            listedPart.partProgramPath = listedPart.partProgramPath+listedCabinet.cabCode+"-"+listedPart.partName+"-"+listedCabinet.drawerType+".pgmx"
                        }
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'stretcher':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness);
                        listedPart.partWidth = 100;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'bottom':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness);
                        listedPart.partWidth = listedCabinet.cabDepth-material.thickness;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'top':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness);
                        listedPart.partWidth = listedCabinet.cabDepth-material.thickness;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'back':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabWidth;
                        this.updateCSV(listedPart,listedCabinet.cabNum);
                        break;
                    case 'shelf':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness)-5;
                        listedPart.partWidth = listedCabinet.cabDepth-material.thickness-7;
                        if (Cabinets.findOne({code: listedCabinet.cabCode, "constructionParts.partName": "stretcher"})) {
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
                        if (Cabinets.findOne({code: listedCabinet.cabCode, "constructionParts.partName": "stretcher"})) {
                            listedPart.partLength = 260
                        } else {
                            listedPart.partLength = 560
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