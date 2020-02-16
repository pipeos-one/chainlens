import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import { Content, Icon, Item, Input, ListItem, Body, Radio, Text, Left, Right } from "native-base";
import {debounce} from '../utils.js';

export default class SearchIO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
      text: '',
      type: 'name',
      valid: false,
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
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

  onValueChange(selected) {
    console.log('onValueChange', selected);
    this.setState({ selected });
    // const details = queryType(text);
    // this.setState({ text, ...details });
    // if (details.valid) this.debouncedSearch();
  }

  onCheckBoxChange(selected) {
    console.log('onCheckBoxChange', selected);
  }

  render() {
    return (
      <Content>
          <Item>
            <Icon name='search'/>
            <Input
              placeholder='type: address / uint256 / ...'
              onChangeText={text => this.onChangeText(text)}
            />
            <Icon type="MaterialCommunityIcons" name='function-variant' />
          </Item>

          <Content>
            <ListItem>
              <Radio selected={true} />
              <Body>
                <Text>input</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Radio selected={false} />
              <Body>
                <Text>output</Text>
              </Body>
            </ListItem>
          </Content>

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
