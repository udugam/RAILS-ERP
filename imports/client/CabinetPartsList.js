import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';

export default class CabinetPartsList extends Component {
    render() {
        return (
        <div>
            <Table>
                 <tbody>
                    <tr>
                        <th>Part Name</th>
                        <th>Length Equation (Grain Direction)</th>
                        <th>Width Equation</th>
                        <th>Thickness</th>
                        <th>Program Path and Name </th>
                    </tr>
                    {this.props.parts.map((part) => {
                        return (
                            <tr key={part.partNum}>
                                <td>{part.partName}</td>
                                <td>{part.partLength}</td>
                                <td>{part.partWidth}</td>
                                <td>{part.partThickness}</td>
                                <td>{part.partProgramPath}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
        )
    }
}
