import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import {
  Content,
  View,
  Card,
  CardItem,
  Icon,
  Text,
  Button,
  H1,
  Right,
  Left,
} from "native-base";

import IoGapi from './IoGapi.js';
import { pfunctionColor } from '../../utils.js';

export class PfunctionGapi extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputs: this.initInputsState(),
      outputs: [],
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.onRun = this.onRun.bind(this);
  }

  initInputsState() {
    const { pfunction } = this.props.item;
    const ioGapiInputs = this.ioGapiInputs(pfunction);
    return ioGapiInputs && ioGapiInputs.components
      ? new Array(ioGapiInputs.components.length)
      : [];
  }

  typesig(typ) {
    let sig = '';
    if (typ.name) sig += `${typ.name}:`;
    sig += typ.type;
    return sig;
  }

  ioGapiInputs(pfunction) {
    const signatureInp = `(${pfunction.data.gapi.inputs.map(inp => this.typesig(inp)).join(',')})`;

    return pfunction.data.gapi.inputs.length > 0 ? {
      name: pfunction.data.signature,
      type: 'tuple',
      components: pfunction.data.gapi.inputs,
      label: signatureInp,
    } : null;
  }

  ioGapiOutputs(pfunction) {
    const signatureOut = `(${pfunction.data.gapi.outputs.map(inp => this.typesig(inp)).join(',')})`;

    return pfunction.data.gapi.outputs.length > 0 ? {
      name: pfunction.data.signature,
      type: 'tuple',
      components: pfunction.data.gapi.outputs,
      label: signatureOut,
    } : null;
  }

  onValueChange(value) {
    console.log('--- onValueChange', value);
    this.setState({ inputs: value });
  }

  onRun() {
    this.props.onRun(this.state.inputs);
  }

  render() {
    const { pfunction } = this.props.item;
    const width = this.props.styles.minWidth - 40;
    const ioStyles = { minWidth: width, width };

    const ioGapiInputs = this.ioGapiInputs(pfunction);
    const ioGapiOutputs = this.ioGapiOutputs(pfunction);

    return (
      <View style={{...this.props.styles, flex: 1, width: this.props.styles.minWidth }}>
        <CardItem style={{ backgroundColor: pfunctionColor(pfunction.data.gapi) }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <H1 style={{ paddingRight: 20 }}>{pfunction.data.name}</H1>
          </View>
        </CardItem>
        <Content>
          <Card>
            <CardItem header>
              <Text>Inputs</Text>
            </CardItem>
            <CardItem>
              <IoGapi
                item={ioGapiInputs}
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
                item={ioGapiOutputs}
                readonly={true}
                value={this.state.outputs}
                styles={ioStyles}
              />
            </CardItem>
          </Card>
        </Content>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
        }}>
          <Left>
            <Button small rounded style={styles.buttonStyle} onClick={this.props.onInfoClosed} >
              <Icon type="MaterialCommunityIcons" name='close' />
            </Button>
          </Left>
          <Right>
            <Button small rounded style={styles.buttonStyle} onClick={this.onRun} >
              <Icon type="MaterialCommunityIcons" name='play' />
            </Button>
          </Right>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
  }
)
