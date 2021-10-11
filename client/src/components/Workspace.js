import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Right,
  Left,
  Icon,
  Button,
  Text,
  Picker,
} from 'native-base';
import { exportToRemix, exportToPlugin } from '../utils/remix.js';
import PclassList from './PclassList.js';


export default class Workspace extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: 'remix',
    }

    this.onValueChange = this.onValueChange.bind(this);
    this.exportTo = this.exportTo.bind(this);
  }

  onValueChange(value) {
    this.setState({ selected: value });
  }

  exportTo(pclass) {
    const selected = this.state.selected;
    const data = pclass ? [pclass] : this.props.treedata;

    if (selected === 'remix') {
      exportToRemix(data)
    } else {
      exportToPlugin(data, 'pipeline');
    }
  }

  render() {
    const { props } = this;
    const buttons = {
      header: [
        {
          callback: props.onRemove,
          icon: {
            type: 'FontAwesome',
            name: 'close',
          }
        },
        {
          callback: this.exportTo,
          icon: {
            type: 'MaterialCommunityIcons',
            name: 'import',
          }
        }
      ],
      contentItem: []
    }

    return (
      <View style={{...props.styles, flex: 1}}>
        <PclassList
          data={props.treedata}
          buttons={buttons}
          styles={props.styles}
        />

        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 5,
          borderTopWidth: 1,
          borderTopColor: '#cccccc',
        }}>
          <Left>
            <Button small rounded style={styles.buttonStyle} onClick={props.onGoToSearchList}>
              <Icon type="MaterialCommunityIcons" name='chevron-left' />
            </Button>
          </Left>
          <Picker
            mode="dropdown"
            style={{ width: 0, marginRight: 10 }}
            selectedValue={ this.state.selected }
            onValueChange={ this.onValueChange }
          >
            <Picker.Item label="FileManager" value="remix" />
            <Picker.Item label="Pipeline" value="pipeline" />
            <Picker.Item label="JSON" value="json" />
          </Picker>
          <Right>
            <Button small rounded style={styles.buttonStyle} onClick={ this.exportTo }>
              <Text>{props.treedata.length}</Text>
              <Icon type="MaterialCommunityIcons" name='import' />
            </Button>
          </Right>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
  },
)
