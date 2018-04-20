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
                        </tr>
                        {this.props.panels.map((panel) => {
                        return (
                            <tr>
                                <td>{panel.cabNum}</td>
                                <td>{panel.width}</td>
                                <td>{panel.height}</td>
                                <td>{panel.thickness}</td>
                                <td>{panel.material}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}