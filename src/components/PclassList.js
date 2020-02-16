import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import {
  Content,
  View,
  Accordion,
  List,
  ListItem,
  Left,
  Icon,
  Text,
  Button,
  Thumbnail,
} from "native-base";

export default class PclassList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemHeight: 0,
    }

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this.addToHeight = this.addToHeight.bind(this);
  }

  addToHeight(node) {
    // console.log('itemHeight', this.state.itemHeight, node.offsetHeight, node)
    // console.log('current', node.current)
    if (node && !this.state.itemHeight) {
      this.setState({
          itemHeight: node.offsetHeight
      });
    }
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
        ref={this.addToHeight}
      >

        <View style={{flexDirection: "row"}}>
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />
          }
          <Text style={{ fontWeight: "500", paddingLeft: 10 }}>
            {item.data.name}
          </Text>
        </View>

        <View style={{flexDirection: "row"}}>
          <Button small rounded style={styles.buttonStyle}>
            <Icon type="MaterialCommunityIcons" name='import' />
          </Button>
        </View>
      </View>
    );
  }

  _renderContent(item) {
    const pfunctions = [];
    item.pfunctions.forEach(pfunction => {
      if (!pfunction.data.name) return;
      pfunctions.push((
        <ListItem key={pfunction._id}>
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
              <Text style={{ paddingLeft: 10 }}>{pfunction.data.signature}</Text>
            </View>
          </Left>
        </ListItem>
      ));
    });

    return (
      <List style={{ paddingLeft: 15 }}>{pfunctions}</List>
    )
  }

  _onEndReached({distanceFromEnd}) {
    console.log('_onEndReached distanceFromEnd', distanceFromEnd);
  }

  setCurrentReadOffset = (event) => {
    // console.log('setCurrentReadOffset', event.nativeEvent.contentOffset.y, event);
    let itemHeight = 100;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let currentItemIndex = Math.ceil(currentOffset / itemHeight);
    console.log('currentItemIndex', currentItemIndex);
    // this.state.dataset.setReadOffset(currentItemIndex);
  }

  render() {
    const dataArray = this.props.data;
    return (
      <Content
        scrollEventThrottle={300}
        removeClippedSubviews={true}
        nestedScrollEnabled={true}
        onScroll={this.setCurrentReadOffset}
        contentContainerStyle={{height: "100%"}}
      >
      <Accordion
        dataArray={dataArray}
        keyExtractor={item => item._id}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.9}
        contentStyle={{ flex: 1 }}
      />
      </Content>
    );
  }
}


const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
      marginLeft: 15,
    }
  }
)
