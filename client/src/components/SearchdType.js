import React, { Component } from "react";
import { Icon, Item, Input} from "native-base";

const queryField = (text) => {
  return {field: 'dtype', valid: true};
}

export default class SearchdType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      field: 'dtype',
      valid: true,
    }

    this.onChangeText = this.onChangeText.bind(this);
  }

  onChangeText(text) {
    const details = queryField(text);
    this.setState({ text, ...details });
    if (details.valid) this.props.onQueryChange({ text, ...details });
  }

  render() {
    return (
      <Item error={this.state.valid ? false : true}>
        <Icon name='search'/>
        <Input
          placeholder='dtype'
          onChangeText={text => this.onChangeText(text)}
        />
      </Item>
    );
  }
}
