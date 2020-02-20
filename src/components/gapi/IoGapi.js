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
  Input,
  Label,
  Item,
  Button,
  Accordion,
} from "native-base";

const nonStringTypes = ['int', 'float', 'tuple', 'boolean'];
const checkNonString = itemType => nonStringTypes.find(typ => itemType.includes(typ));
const decodeValueString = value => value || '';
const encodeValueString = value => value || '';
const decodeValueNonString = value => value ? JSON.parse(value) : null;
const encodeValueNonString = value => value ? JSON.stringify(value) : '';

function IoUI(props) {
  const { item } = props;
  const isNonString = checkNonString(item.type);
  let decodeValue, encodeValue;

  if (isNonString) {
    decodeValue = decodeValueNonString;
    encodeValue = encodeValueNonString;
  } else {
    decodeValue = decodeValueString;
    encodeValue = encodeValueString;
  }
  console.log('encodeValue', encodeValue(props.value));
  return (
    <Input
      bordered={'true'} rounded={'true'}
      value={encodeValue(props.value)}
      onChangeText={(text) => props.onValueChange(decodeValue(text))}
      styles={props.styles}
      />
  )
}

export default class IoGapi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      componentsOpened: false,
      componentValues: props.value,
    }

    // this.onValueChange = this.onValueChange.bind(this);
    this.onComponentsValueChange = this.onComponentsValueChange.bind(this);
    this.onOpenComponents=this.onOpenComponents.bind(this);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
  }

  getLabel(item) {
    return `${item.name}:${item.type}`;
  }

  onOpenComponents() {
    console.log('onOpenComponents');
    this.setState({ componentsOpened: true });
  }

  onComponentsValueChange(value, i) {
    console.log('IoGapi onComponentsValueChange', value, i);
    const componentValues = this.state.componentValues;
    componentValues[i] = value;
    this.setState({ componentValues });
    this.props.onValueChange(componentValues);
  }

  _renderHeader(item, expanded) {
    const label = this.getLabel(item);
    return (
      <View style={{
          padding: 5,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fafafa"
        }}
      >
        <View style={{flexDirection: "row"}}>
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />
          }
          <Item stackedLabel style={{ width: '100%' }}>
            <Label>{label}</Label>
            <IoUI
              item={item}
              value={this.state.componentValues}
              onValueChange={this.props.onValueChange}
              styles={this.props.styles}
            />
          </Item>
        </View>
      </View>
    )
  }

  _renderContent(item) {
    return (item.components || []).map((subio, i) => {
      return (
        <IoGapi
          key={i}
          styles={this.props.styles}
          item={subio}
          value={this.state.componentValues[i]}
          onValueChange={(value) => this.onComponentsValueChange(value, i)}
        />
      );
    });
  }

  render() {
    const { item, styles } = this.props;
    const label = this.getLabel(item);

    return (
      <View style={{ flexDirection: "row", alignItems: "center"}}>
        {item.components && item.components.length > 1
          ? <Accordion
              dataArray={[item]}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              contentStyle={{ ...styles, flex: 1, backgroundColor: '#ffffff' }}
            />
          : <Item stackedLabel style={{ width: '100%' }}>
              <Label>{label}</Label>
              <IoUI
                styles={styles}
                item={item}
                value={this.props.value}
                onValueChange={this.props.onValueChange}
              />
            </Item>
        }
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
