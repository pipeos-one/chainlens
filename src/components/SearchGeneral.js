import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Content, Icon, Item, Input} from "native-base";
import {debounce} from '../utils.js';

const queryType = (text) => {
  if (text.slice(0, 2) === '0x') {
    if (text.length === 42) return {text: 'address', valid: true};
    if (text.length === 10) return {text: 'signature', valid: true};

    return {text: 'unknown', valid: false};
  }
  return {text: 'name', valid: true};
}

export default class SearchGeneral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      type: 'name',
      valid: false,
    }

    this.onChangeText = this.onChangeText.bind(this);
    this.debouncedSearch = this.debouncedSearch.bind(this);
  }

  debouncedSearch() {
    const self = this;
    return (debounce(function() {
        // this.isCalculating = true;
        setTimeout(function () {
            // this.isCalculating = false;
            console.log('-- search', self.state);
        }.bind(self), 1000);
    }, 1000))();
  }

  onChangeText(text) {
    console.log('onChangeText', text);
    const details = queryType(text);
    this.setState({ text, ...details });
    if (details.valid) this.debouncedSearch();
  }

  render() {
    return (
      <Content>
          <Item>
            <Icon name='search'/>
            <Input
              placeholder='name / address / signature'
              onChangeText={text => this.onChangeText(text)}
            />
            <Icon style={{ paddingLeft: 15 }} type="MaterialIcons" name='library-books' />
            <Icon type="MaterialCommunityIcons" name='function-variant' />
          </Item>
        </Content>
    );
  }
}


const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
      marginLeft: 15,
    }
  }
)
