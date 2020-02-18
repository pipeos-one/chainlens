import React, { Component } from "react";
import { StyleSheet, FlatList } from 'react-native';
import {
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
      endWasReached: false,
      scrolled: false,
      // refreshing: false,
    }

    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);

    this._renderListItem = this._renderListItem.bind(this);

    this._onEndReached = this._onEndReached.bind(this);
    this._onScroll = this._onScroll.bind(this);
    // this._onRefresh = this._onRefresh.bind(this);
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
          <Button small rounded style={styles.buttonStyle} onClick={() => this.props.onSelect(item)} >
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
              <Text style={{ fontFamily: null, paddingLeft: 10 }}>{pfunction.data.signature}</Text>
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
    this.setState({ endWasReached: true });
    this.props.onAddListPage();
  }

  // _onRefresh() {
  //   console.log('!!_onRefresh')
  // }

  _onScroll(event) {
    console.log('contentOffset.y', event.nativeEvent.contentOffset.y)
    if (event.nativeEvent.contentOffset.y > 300) {
      this.setState({ scrolled: true })
    }
    // if (this.state.endWasReached && event.nativeEvent.contentOffset.y === 0) {
    if (this.state.scrolled && event.nativeEvent.contentOffset.y === 0) {
      this.props.onPreviousPage();
    }
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
    const { data: dataArray, onAddListPage } = this.props;

    return (
      <FlatList
        data={dataArray}
        keyExtractor={item => item._id}
        renderItem={this._renderListItem}

        scrollEnabled={true}
        scrollEventThrottle={300}

        onEndReached={onAddListPage ? this._onEndReached : () => {}}
        onEndReachedThreshold={0.2}
        onScroll={onAddListPage ? this._onScroll : () => {}}

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
