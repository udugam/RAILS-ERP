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
            let material = Materials.findOne({name:listedCabinet.cabMaterial});
            cabinet.constructionParts.map((listedPart) => {
                switch(listedPart.partName) {
                    case 'lGable':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabDepth-listedPart.partThickness;
                        this.updateCSV(listedPart);
                        break;
                    case 'rGable':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabDepth-listedPart.partThickness;
                        this.updateCSV(listedPart);
                        break;
                    case 'stretcher':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness);
                        listedPart.partWidth = 100;
                        this.updateCSV(listedPart);
                        break;
                    case 'bottom':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabWidth-(2*material.thickness);
                        listedPart.partWidth = listedCabinet.cabDepth-material.thickness;
                        this.updateCSV(listedPart);
                        break;
                    case 'back':
                        listedPart.partThickness = material.thickness;
                        listedPart.partLength = listedCabinet.cabHeight;
                        listedPart.partWidth = listedCabinet.cabWidth;
                        this.updateCSV(listedPart);
                        break;
                    default:
                        console.log("Part Does Not Exist"); 
                }
            })
        })
    }

    updateCSV(listedPart) {
        let listedCSVPart = [
            'Piece',
            '',
            '',
            '1',
            '0',
            listedPart.partLength,
            listedPart.partWidth,
            listedPart.partThickness,
            '',
            '1',
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