import React, { Component } from 'react';
import {
  View,
  Left,
  Icon,
  Button,
} from 'native-base';
import SearchGeneral from './SearchGeneral.js';
import SearchIO from './SearchIO.js';

export default class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genQuery: { text: '', field: 'name' },
      fxQuery: { text: '', field: 'inputs' },
    }

    this.onQueryChangeGeneral = this.onQueryChangeGeneral.bind(this);
    this.onQueryChangeFx = this.onQueryChangeFx.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onQueryChangeGeneral(genQuery) {
    this.setState({ genQuery });
  }

  onQueryChangeFx(fxQuery) {
    this.setState({ fxQuery });
  }

  onSearch() {
    this.props.onQueryChange(this.state);
  }

  render() {
    return (
      <View style={{
        ...this.props.styles,
        flex: 1,
        flexDirection: "column",

        justifyContent: "space-between",
      }}>

        <SearchGeneral onQueryChange={this.onQueryChangeGeneral} />

        <SearchIO onQueryChange={this.onQueryChangeFx} />

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
        </View>
      </View>
    )
  }
}
