import React, { Component } from "react";
import { Content, Icon, Item, Input} from "native-base";
// import {debounce} from '../utils.js';

const queryField = (text) => {
  if (text.slice(0, 2) === '0x') {
    if (text.length === 42) return {field: 'address', valid: true};
    if (text.length === 10) return {field: 'signature', valid: true};

    return {field: 'unknown', valid: false};
  }
  return {field: 'name', valid: true};
}

export default class SearchGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      field: 'name',
      valid: true,
    }

    this.onChangeText = this.onChangeText.bind(this);
    // this.debouncedSearch = this.debouncedSearch.bind(this);
  }

  // debouncedSearch = debounce(function() {
  //       this.isCalculating = true;
  //       setTimeout(function () {
  //           this.isCalculating = false;
  //           console.log('-- search', this.state);
  //       }.bind(this), 1000);
  //   }, 1200)

  onChangeText(text) {
    console.log('onChangeText', text);
    const details = queryField(text);
    this.setState({ text, ...details });
    // if (details.valid) this.debouncedSearch();
    if (details.valid) this.props.onQueryChange({ text, ...details });
  }

  render() {
    return (

          <Item error={this.state.valid ? false : true}>
            <Icon name='search'/>
            <Input
              placeholder='name / address / signature'
              onChangeText={text => this.onChangeText(text)}
            />
            <Icon style={{ paddingLeft: 15 }} type="MaterialIcons" name='library-books' />
            <Icon type="MaterialCommunityIcons" name='function-variant' />
          </Item>
        
    );
  }
}
