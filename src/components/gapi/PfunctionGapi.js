import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import {
  Content,
  View,
  Body,
  Card,
  CardItem,
  Icon,
  Text,
  Textarea,
  Button,
  Input,
  Item,
  Label,
  Form,
} from "native-base";

import IoGapi from './IoGapi.js';

export class PfunctionGapi extends Component {
  constructor(props) {
    super(props);

    const { pfunction } = this.props.item;
    this.ioGapiInputs = {
      name: pfunction.data.signature,
      type: 'tuple',
      components: pfunction.data.gapi.inputs,
    }
    this.ioGapiOutputs = {
      name: pfunction.data.signature,
      type: 'tuple',
      components: pfunction.data.gapi.outputs,
    }

    this.state = {
      inputs: this.ioGapiInputs.components ? new Array(this.ioGapiInputs.components.length) : [],
      outputs: null,
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.onRun = this.onRun.bind(this);
  }

  onValueChange(value) {
    console.log('--- onValueChange', value);
    this.setState({ input: value });
  }

  onRun() {
    this.props.onRun(this.state.inputs);
  }

  render() {
    const { pclass, pfunction } = this.props.item;
    const width = this.props.styles.minWidth - 40;
    const ioStyles = { minWidth: width, width };

    return (
      <Content style={{...this.props.styles, flex: 1 }}>
        <Card>
          <CardItem header>
            <Button small rounded style={styles.buttonStyle} onClick={this.props.onInfoClosed} >
              <Icon type="MaterialCommunityIcons" name='close' />
            </Button>
          </CardItem>
          <CardItem header>
            <Button small rounded style={styles.buttonStyle} onClick={this.onRun} >
              <Text>{pfunction.data.name}</Text>
              <Icon type="MaterialCommunityIcons" name='play' />
            </Button>
          </CardItem>
          <CardItem header>
            <Text>Inputs</Text>
          </CardItem>
          <CardItem>
            <IoGapi
              item={this.ioGapiInputs}
              value={this.state.inputs}
              onValueChange={this.onValueChange}
              styles={ioStyles}
            />
          </CardItem>
          <CardItem header>
            <Text>Outputs</Text>
          </CardItem>
          <CardItem>
            <IoGapi
              item={this.ioGapiOutputs}
              readonly={true}
            />
          </CardItem>
        </Card>
      </Content>
    );
  }
}

// <Item floatingLabel>
//   <Label>TODO</Label>
//   <Input
//     bordered={'true'} rounded={'true'}
//     placeholder='TODO'
//     onChangeText={text => onChangeText(text)}
//   />
//   <Icon type="FontAwesome" name='caret-down' />
// </Item>

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
  }
)
