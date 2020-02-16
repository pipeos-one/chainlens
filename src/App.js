import React, { Component } from 'react';
import './App.css';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import {
  Container,
  View,
  Right,
  Left,
  Icon,
  Button,
  Text,
  Badge,
} from 'native-base';
import PclassList from './components/PclassList.js';
import SearchComponent from './components/Search.js';
import { useSearchResults, useSearchCount } from './fetchers.js';
import { buildWhereQueries, buildWhereFx } from './utils.js';

function getPageSize(noOfPages, {width, height}) {
  console.log('--dimensions', noOfPages, {width, height});
  if (width < 700) return {minWidth: width, minHeight: height};
  return {minWidth: width / noOfPages, minHeight: height};
}

function WorkTree(props) {
  return (
    <View style={{...props.styles, flex: 1}}>
      <PclassList data={props.treedata}/>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
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
  const { whereFilters } = props;
  let filter = {limit: 10, skip: 0};

  filter.where = whereFilters.pclassWhere;

  const { data, error } = useSearchResults(filter);
  const { data: count } = useSearchCount(filter);

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  const resultsCount = count ? count.count : 0;

  console.log('data', data)
  console.log('count', count)

  return (
    <View style={{ ...props.styles, flex: 1 }}>
      <PclassList data={props.data}/>

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
      }}>
        <Button small rounded style={ styles.buttonStyle }>
          <Icon name='search' />
          <Text>{resultsCount}</Text>
        </Button>
        <Text>
          @{0}
        </Text>
        <Button small transparent>
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

    this.state = {
      ...Dimensions.get('window'),
      pclassWhere: {},
      pfunctionWhere: {},
      pclassiWhere: {},
      treedata: [],
    };

    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
  }

  onContentSizeChange() {
    this.setState(Dimensions.get('window'));
  }

  onQueryChange({ genQuery, fxQuery }) {
    console.log('onQueryChange', genQuery, fxQuery);
    let pclassWhere = {}, pfunctionWhere = {}, pclassiWhere = {};

    if (genQuery.valid) {
      ({ pclassWhere, pfunctionWhere, pclassiWhere } = buildWhereQueries(genQuery));
    }

    if (fxQuery.valid) {
      pfunctionWhere = { ...pfunctionWhere, ...buildWhereFx(fxQuery) };
    }

    const isChanged = (
      JSON.stringify(pclassWhere) !== JSON.stringify(this.state.pclassWhere)
      || JSON.stringify(pfunctionWhere) !== JSON.stringify(this.state.pfunctionWhere)
      || JSON.stringify(pclassiWhere) !== JSON.stringify(this.state.pclassiWhere)
    );
    // if (isChanged) {
    //   this.setState({ pclassWhere, pfunctionWhere, pclassiWhere });
    //
    // }
  }

  render() {
    const { width, height, treedata } = this.state;
    const pageStyles = getPageSize(3, { width, height });

    const { pclassWhere, pfunctionWhere, pclassiWhere } = this.state;
    const whereFilters = { pclassWhere, pfunctionWhere, pclassiWhere };

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

        <SearchComponent styles={pageStyles} onQueryChange={this.onQueryChange} />

        <SearchList data={data} styles={pageStyles} />

        <WorkTree treedata={treedata} styles={pageStyles} />

      </ScrollView>
    )
  }
}

function App() {
  return (
      <Container style={ styles.container } >

        <AppContent />

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
