import React, { Component } from 'react';
import './App.css';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Container, Content, Grid, View, Col, Row, Icon, Button, Text, Badge, Footer, FooterTab, Right, Left } from 'native-base';
import PclassList from './components/PclassList.js';
import SearchGeneral from './components/SearchGeneral.js';
import SearchIO from './components/SearchIO.js';
import fetch from 'unfetch';
import useSWR from 'swr';
import {pclassWithPfuncApi} from './utils.js';

async function fetcher(apiUrl) {
  const res = await fetch(apiUrl);
  return await res.json();
}

function getPageSize(noOfPages, {width, height}) {
  console.log('--dimensions', noOfPages, {width, height});
  if (width < 700) return {minWidth: width, minHeight: height};
  return {minWidth: width / noOfPages, minHeight: height};
}

function SearchComponent(props) {
  return (
    <View size={100} style={props.styles}>
      <Row><SearchGeneral/></Row>
      <Row><SearchIO/></Row>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        paddingBottom: 5,
        paddingRight: 5,
      }}>
        <Right>
          <Button small rounded style={styles.buttonStyle}>
            <Icon type="MaterialCommunityIcons" name='import' />
          </Button>
        </Right>
      </View>
    </View>
  )
}

function WorkTree(props) {
  return (
    <View style={{...props.styles, flex: 1}}>
      <PclassList data={props.treedata}/>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
      }}>
        <Left>
          <Button small rounded style={styles.buttonStyle}>
            <Icon type="MaterialCommunityIcons" name='chevron-left' />
          </Button>
        </Left>
        <Right>
          <Button small rounded style={styles.buttonStyle}>
            <Icon type="MaterialCommunityIcons" name='import' />
          </Button>
        </Right>
      </View>
    </View>
  )
}

function SearchList(props) {
  return (
    <View style={{...props.styles, flex: 1}}>
      <PclassList data={props.data}/>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 5,
        paddingLeft: 5,
        paddingRight: 5,
      }}>
        <Button small rounded style={styles.buttonStyle}>
          <Icon name='search' />
          <Text>{100}</Text>
        </Button>
        <Text>
          @{0}
        </Text>
        <Button transparent>
          <Badge info>
            <Text>2</Text>
          </Badge>
        </Button>
      </View>

    </View>
  )
}

class AppContent extends Component {
  constructor(props) {
    super(props);

    this.state = Dimensions.get('window');

    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  onContentSizeChange() {
    this.setState(Dimensions.get('window'));
  }

  render() {
    const { data } = this.props;
    const { width, height } = this.state;
    const pageStyles = getPageSize(3, { width, height });
    const treedata = data.slice(0, 3);

    return (
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={true}
        scrollEventThrottle={100}
        nestedScrollEnabled={true}
        contentContainerStyle={{width: "100%"}}
        onContentSizeChange={this.onContentSizeChange}
      >

        <SearchComponent styles={pageStyles} />

        <SearchList data={data} styles={pageStyles} />

        <WorkTree treedata={treedata} styles={pageStyles} />

      </ScrollView>
    )
  }
}

function App() {
  const filter = {limit: 10, skip: 0};
  const { data, error } = useSWR(pclassWithPfuncApi(filter), fetcher)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('data', data)

  return (
      <Container style={styles.container}>

        <AppContent data={data}/>

      </Container>
  );
}

export default App;

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
    container: {
      width: '100%',
      height: '100%',
    },
  }
)
