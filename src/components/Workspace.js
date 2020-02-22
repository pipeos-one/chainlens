import React from 'react';
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
import { exportToRemix, exportPclassToRemix } from '../utils/remix.js';
import PclassList from './PclassList.js';


export default function Workspace(props) {
  return (
    <View style={{...props.styles, flex: 1}}>
      <PclassList data={props.treedata} onSelect={item => exportPclassToRemix(item)}/>

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
          iosIcon={<Icon name="arrow-down" />}
          style={{ width: 0, marginRight: 10 }}
          selectedValue={'Remix'}
          onValueChange={props.onValueChange || (() => {})}
        >
          <Picker.Item label="Remix" value="key0" />
          <Picker.Item label="Pipeline" value="key1" />
          <Picker.Item label="JSON" value="key2" />
        </Picker>
        <Right>
          <Button small rounded style={styles.buttonStyle} onClick={() => exportToRemix(props.treedata)}>
            <Text>{props.treedata.length}</Text>
            <Icon type="MaterialCommunityIcons" name='import' />
          </Button>
        </Right>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
  },
)
