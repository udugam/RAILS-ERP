import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default class CabinetList extends Component {
    render() {
        return (
        <div>
            <Table>
                 <tbody>
                    <tr>
                        <th>Cabinet Number</th>
                        <th>Cabinet Code</th>
                        <th>Height (mm)</th>
                        <th>Width (mm)</th>
                        <th>Depth (mm)</th>
                        <th>Material</th>
                        <th></th>
                    </tr>
                    {this.props.cutListCabinets.map((cabinet) => {
                        return (
                            <tr>
                                <td>{cabinet.cabNum}</td>
                                <td>{cabinet.cabCode}</td>
                                <td>{cabinet.cabHeight}</td>
                                <td>{cabinet.cabWidth}</td>
                                <td>{(cabinet.type==="baseCorner" || cabinet.type==="upperCorner") ? cabinet.cabWidth2 : cabinet.cabDepth}</td> {/*Condition for displaying second width of corner cabinets as depth */}
                                <td>{cabinet.cabMaterial}</td>
                                <td> <Button bsStyle="danger" onClick={() => this.props.removeCabinetCallback(cabinet.cabNum)}>DEL</Button> </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        )
    }
}
