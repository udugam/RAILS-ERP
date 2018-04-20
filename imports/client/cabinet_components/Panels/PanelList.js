import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

import DisplayPanelList from './DisplayPanelList'
import Cabinets from '../../../api/Cabinets'

const PANELTHICKNESS = 19
const SCRIBE = 20
const KICK = 120
const DOOR = 19
const BUMPER = 3

export default class PanelList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panels:[]
        }
        this.generatePanels()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props !== nextProps) {
            this.generatePanels()
        }
    }

    generatePanels() {
        const panelsArray = []
        this.props.cabinets.map((listedCabinet) => {
            if (listedCabinet.lpanel) {
                let panelWidth = 0
                let panelHeight = 0
                let panelThickness = PANELTHICKNESS
                let panelMaterial = "add logic"
                switch(listedCabinet.type) {
                    case 'base':
                        panelHeight = listedCabinet.cabHeight+KICK+SCRIBE
                        panelWidth = listedCabinet.cabDepth+DOOR+BUMPER+SCRIBE
                        panelThickness = PANELTHICKNESS

                        panelsArray.push({
                            cabNum: listedCabinet.cabNum,
                            width: panelWidth,
                            height: panelHeight,
                            thickness: panelThickness,
                            material: panelMaterial
                        })
                        this.setState({
                            panels: panelsArray 
                        })
                        break
                    default: 
                }
            }
            if (listedCabinet.rpanel) {
                let panelWidth = 0
                let panelHeight = 0
                let panelThickness = PANELTHICKNESS
                let panelMaterial = "add logic"
                switch(listedCabinet.type) {
                    case 'base':
                        panelHeight = listedCabinet.cabHeight+KICK+SCRIBE
                        panelWidth = listedCabinet.cabDepth+DOOR+BUMPER+SCRIBE
                        panelThickness = PANELTHICKNESS

                        panelsArray.push({
                            cabNum: listedCabinet.cabNum,
                            width: panelWidth,
                            height: panelHeight,
                            thickness: panelThickness,
                            material: panelMaterial
                        })
                        this.setState({
                            panels: panelsArray 
                        })
                        break
                    default: 
                }
            }
            
            
        })
    }

    render() {
        return (
            <Panel>
                <DisplayPanelList panels={this.state.panels}/>
            </Panel>
        )
    }
}