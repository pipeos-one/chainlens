import React, { Component } from "react";
import {
  Content,
  View,
  Body,
  Item,
  ListItem,
  Icon,
  Input,
  Radio,
  Text,
} from "native-base";
// import {debounce} from '../utils.js';

export default class SearchIO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      field: 'inputs',
      text: '',
      valid: true,
    }

    this.onChangeText = this.onChangeText.bind(this);
    this.onFieldSelect = this.onFieldSelect.bind(this);
    // this.debouncedSearch = this.debouncedSearch.bind(this);
  }

  // debouncedSearch() {
  //   const self = this;
  //   return (debounce(function() {
  //       // this.isCalculating = true;
  //       setTimeout(function () {
  //           // this.isCalculating = false;
  //           console.log('-- search', self.state);
  //       }.bind(self), 1000);
  //   }, 1000))();
  // }

  onChangeText(text) {
    this.setState({ text });
    // const details = queryType(text);
    // this.setState({ text, ...details });
    // if (details.valid) this.debouncedSearch();
    this.props.onQueryChange({ ...this.state, text });
  }

  onFieldSelect(field) {
    this.setState({ field });
    this.props.onQueryChange({ ...this.state, field });
  }

  render() {
    return (
      <View>
          <Item>
            <Icon name='search'/>
            <Input
              placeholder='type: address / uint256 / ...'
              onChangeText={text => this.onChangeText(text)}
            />
          </Item>

          <Content>
            <ListItem
              selected={this.state.field === 'inputs' ? true : false}
              onClick={() => this.onFieldSelect('inputs')}
            >
              <Radio selected={this.state.field === 'inputs' ? true : false} />
              <Body>
                <Text style={{ fontFamily: null }}>input</Text>
              </Body>
            </ListItem>
            <ListItem
              selected={this.state.field === 'outputs' ? true : false}
              onClick={() => this.onFieldSelect('outputs')}
            >
              <Radio selected={this.state.field === 'outputs' ? true : false} />
              <Body>
                <Text style={{ fontFamily: null }}>output</Text>
              </Body>
            </ListItem>
          </Content>

      </View>
    );
  }
}
