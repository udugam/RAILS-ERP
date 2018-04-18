import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

import DisplayPanelList from './DisplayPanelList'

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
        const doorsArray = []
        this.props.cabinets.map((listedCabinet) => {
            const cabinet = Cabinets.findOne({code:listedCabinet.cabCode});
            const cabinetParts = cabinet.constructionParts;
            const doorstyle = DoorStyles.findOne({name:listedCabinet.doorStyle});
            switch(listedCabinet.type) {
                case 'base':

                    break
                default:
            }
            
        })
    }

    render() {
        return (
            <Panel>
                <DisplayPanelList />
            </Panel>
        )
    }
}