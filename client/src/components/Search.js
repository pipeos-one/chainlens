import React, { Component } from 'react';
import {
  Content,
  View,
  Left,
  Icon,
  Button,
  Separator,
  Text,
} from 'native-base';
import SearchGeneral from './SearchGeneral.js';
import SearchIO from './SearchIO.js';
import SearchdType from './SearchdType.js';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genQuery: { text: '', field: 'name' },
      fxQuery: { text: '', field: 'inputs' },
      dtQuery: { text: '', field: 'dtype' },
    }

    this.onQueryChangeGeneral = this.onQueryChangeGeneral.bind(this);
    this.onQueryChangeFx = this.onQueryChangeFx.bind(this);
    this.onQueryChangedType = this.onQueryChangedType.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onQueryChangeGeneral(genQuery) {
    this.setState({ genQuery });
  }

  onQueryChangeFx(fxQuery) {
    this.setState({ fxQuery });
  }

  onQueryChangedType(dtQuery) {
    this.setState({ dtQuery });
  }

  onSearch() {
    this.props.onQueryChange(this.state);
  }

  render() {
    return (
      <View style={{ ...this.props.styles, flex: 1 }}>
        <Content>
          <SearchGeneral onQueryChange={this.onQueryChangeGeneral} />
          <Separator bordered></Separator>
          <SearchIO onQueryChange={this.onQueryChangeFx} />
          <SearchdType onQueryChange={this.onQueryChangedType} />
        </Content>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          padding: 5,
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
        }}>
          <Left>
            <Button
              small
              rounded
              style={{backgroundColor: '#cccccc'}}
              onClick={this.onSearch}
            >
              <Icon type="MaterialCommunityIcons" name='import' />
            </Button>
          </Left>
          <Text>Network: {this.props.chain.name}</Text>
        </View>
      </View>
    )
  }
}
