import React, { Component } from "react";
import { StyleSheet, FlatList } from 'react-native';
import {
  View,
  Accordion,
  List,
  ListItem,
  Left,
  Right,
  Icon,
  Text,
  Button,
  Thumbnail,
} from "native-base";
import { pfunctionColor } from '../utils.js';

export default class PclassList extends Component {
  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._renderListItem = this._renderListItem.bind(this);
  }

  _renderHeader(item, expanded) {
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
          <Text style={{ fontFamily: null, fontWeight: "400", paddingLeft: 10 }}>
            {item.data.name}
          </Text>
        </View>

        <View style={{flexDirection: "row"}}>
          <Button small rounded style={styles.buttonStyle} onClick={() => this.props.onInfo(item)} >
            <Icon type="FontAwesome" name='info' />
          </Button>
          <Button small rounded style={styles.buttonStyle} onClick={() => this.props.onSelect(item)} >
            <Icon type="MaterialCommunityIcons" name='import' />
          </Button>
        </View>
      </View>
    );
  }

  _renderContent(item) {
    const pfunctions = [];
    (item.pfunctions || []).forEach(pfunction => {
      if (!pfunction.data.name) return;

      let signature = pfunction.data.signatureString;
      if (
        pfunction.data.gapi.outputs
        && pfunction.data.gapi.outputs.length > 0
      ) {
        signature += `->(${
          pfunction.data.gapi.outputs
            .map(out => out.type)
            .join(',')
        })`;
      }
      pfunctions.push((
        <ListItem key={pfunction._id} style={{ backgroundColor: pfunctionColor(pfunction.data.gapi) }}>
          <Left>
            <View style={{flexDirection: "row", alignItems: "center"}}>
              {pfunction.data.gapi.type === 'event'
                ? <Thumbnail
                    source={{ uri: '/event.png' }}
                    style={{ height: 15, width: 15, borderRadius: 5}}
                  />
                : <Thumbnail
                    source={{ uri: '/lambda.png' }}
                    style={{ height: 15, width: 15, borderRadius: 5}}
                  />
              }
              <Text style={{ fontFamily: null, paddingLeft: 10 }}>{signature}</Text>
            </View>
          </Left>
          <Right>
            <Button small rounded style={styles.buttonStyle} onClick={() => this.props.onPfunctionRun({ pfunction, pclass: item })} >
              <Icon type="MaterialCommunityIcons" name='play' />
            </Button>
          </Right>
        </ListItem>
      ));
    });

    return (
      <List style={{ paddingLeft: 15 }}>{pfunctions}</List>
    )
  }

  _renderListItem({ item, index, separators }) {
    return (
      <Accordion
        dataArray={[item]}
        keyExtractor={item => item._id}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        contentStyle={{ flex: 1, backgroundColor: '#ffffff' }}
      />
    );
  }

  render() {
    const { data: dataArray } = this.props;

    return (
      <FlatList
        data={dataArray}
        keyExtractor={item => item._id}
        renderItem={this._renderListItem}

        scrollEnabled={true}
        scrollEventThrottle={300}

        contentStyle={{ flex: 1, backgroundColor: '#ffffff' }}
      />
    );

    // removeClippedSubviews={true}
    // getItemLayout
    // nestedScrollEnabled={true}
    // onRefresh={this._onRefresh}
    // refreshing={this.state.refreshing}
  }
}


const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
      marginLeft: 15,
    },
  }
)
