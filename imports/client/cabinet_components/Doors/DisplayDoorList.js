import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';



export default class DisplayDoorList extends Component {

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
                        <th>Door Style</th>
                        <th>Material</th>
                        <th>Qty</th>
                    </tr>
                    {this.props.doors.map((door) => {
                        return (
                            <tr>
                                <td>{door.cabNum}</td>
                                <td>{door.width}</td>
                                <td>{door.height}</td>
                                <td>{door.thickness}</td>
                                <td>{door.style}</td>
                                <td>{door.material}</td>
                                <td>{door.qty}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        )
    }
}