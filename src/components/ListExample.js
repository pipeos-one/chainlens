import React, { Component } from "react";
import { Icon, Accordion, Text, View, List, ListItem, Left, Right} from "native-base";

export default class ListExample extends Component {
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,

        alignItems: "center",
        backgroundColor: "#fafafa" }}>

        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
        <Text style={{ fontWeight: "600", paddingLeft: 15 }}>
          {item.data.name}
        </Text>

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
            <Text>{pfunction.data.name}</Text>
          </Left>
        </ListItem>
      ));
    });

    return (
      <List style={{ paddingLeft: 40 }}>{pfunctions}</List>
    )
  }

  render() {
    const dataArray = this.props.data;
    return (
      <Accordion
        dataArray={dataArray}
        renderHeader={this._renderHeader}
        renderContent={this._renderContent}
      />
    );
  }
}
