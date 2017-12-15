import React, {Component} from 'react';
import {
    Table,
    Button
} from 'React-Bootstrap';

export default class GenerateCutListCSV extends Component {
    render() {
        return (
        <div>
          <Button block bsSize='large' bsStyle="success" >Generate CSV</Button>
        </div>
        )
    }
}