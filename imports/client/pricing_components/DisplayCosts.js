import React, {Component} from 'react'

export default class DisplayCosts extends Component {
    render() {
        return (
            <div>
                <h5>Material: ${this.props.breakdown.material}</h5>
                <h5>Doors: ${this.props.breakdown.doors}</h5>
                <h5>Paint: ${this.props.breakdown.paint}</h5>
                <h5>Drawers: ${this.props.breakdown.drawers}</h5>
                <h5>Hardware: ${this.props.breakdown.hardware}</h5>
                <h5>Crown: ${this.props.breakdown.crown}</h5>
                <h5>Production: ${this.props.breakdown.production}</h5>
                <h5>Accessories: ${this.props.breakdown.accessories}</h5>
                <h5>MillworkItems: ${this.props.breakdown.millworkItems}</h5>
            </div>
        )
    }
}