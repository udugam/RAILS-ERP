import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';

export default class CabinetList extends Component {
    render() {
        return (
        <div>
            <Table>
                 <tbody>
                    <tr>
                        <th>Cabinet Code</th>
                        <th>Width (mm)</th>
                        <th>Height (mm)</th>
                        <th>Depth (mm)</th>
                        <th>Material</th>
                    </tr>
                    {this.props.cutListCabinets.map((cabinet) => {
                        return (
                            <tr>
                                <td>{cabinet.cabCode}</td>
                                <td>{cabinet.cabWidth}</td>
                                <td>{cabinet.cabHeight}</td>
                                <td>{cabinet.cabDepth}</td>
                                <td>{cabinet.cabMaterial}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        )
    }
}
