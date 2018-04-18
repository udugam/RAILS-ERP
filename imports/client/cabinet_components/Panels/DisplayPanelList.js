import React, {Component} from 'react';
import {
    Table,
    Button,
    Panel
} from 'React-Bootstrap';

export default class DisplayPanelList extends Component {
    render() {
        return (
            <div>
                <Table>
                    <tbody>
                        <tr>
                            <th>Cabinet Number</th>
                            <th>Width (mm)</th>
                            <th>Height (mm)</th>
                            <th>Thickness (mm)</th>
                            <th>Material</th>
                            <th>Qty</th>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}