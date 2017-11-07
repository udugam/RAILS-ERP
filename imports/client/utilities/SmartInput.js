import React, {Component} from 'react';
import {Panel, FormControl} from 'React-Bootstrap';

export default class SmartInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: false,
      inputValue: 'Click to Enter Value',
    };
    this.convertToInput = this.convertToInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.convertToText = this.convertToText.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  convertToInput(event) {
    this.setState({input: true})
  }

  convertToText(event) {
    this.setState({input: false})
  }

  render() {
    return (
      <div onClick={this.convertToInput}>
        {this.state.input ? <input type='text' name='input' ref='input' onChange={this.handleInputChange} onBlur={this.convertToText}/> : this.state.inputValue}
      </div>
    );
  }
}
