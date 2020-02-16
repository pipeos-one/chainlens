import React, { Component } from 'react';
import {
  View,
  Content,
  Right,
  Separator,
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
  }

  onQueryChangeGeneral(genQuery) {
    this.setState({ genQuery });
    this.props.onQueryChange({ ...this.state, genQuery });
  }

  onQueryChangeFx(fxQuery) {
    this.setState({ fxQuery });
    this.props.onQueryChange({ ...this.state, fxQuery });
  }

  render() {
    return (
      <View style={{ ...this.props.styles, flex: 1 }}>
        <Content>
          <SearchGeneral onQueryChange={this.onQueryChangeGeneral} />
          <Separator bordered></Separator>
          <SearchIO onQueryChange={this.onQueryChangeFx} />
        </Content>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingBottom: 5,
          paddingRight: 5,
        }}>
          <Right>
            <Button small rounded style={{backgroundColor: '#cccccc'}}>
              <Icon type="MaterialCommunityIcons" name='import' />
            </Button>
          </Right>
        </View>
      </View>
    )
  }
}
