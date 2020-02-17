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
import { exportToRemix, exportPclassToRemix } from './remix.js';

const MIN_WIDTH = 800;
const PAGE_LIMIT = 10;

function getPageSize(noOfPages, {width, height}) {
  console.log('--dimensions', noOfPages, {width, height});
  if (width < MIN_WIDTH) return {minWidth: width, minHeight: height};
  return {minWidth: width / noOfPages, minHeight: height};
}

function WorkTree(props) {
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

function SearchList(props) {
  const { whereFilters, filter } = props;
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
      <PclassList
        data={data}
        onSelect={props.onSelect}
        onAddListPage={() => (resultsCount >= (filter.skip + filter.limit)) ? props.onAddListPage() : () => {}}
        onPreviousPage={props.onPreviousPage}
      />

      <View style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        borderTopWidth: 1,
        borderTopColor: '#cccccc',
      }}>
        <Button small rounded style={ styles.buttonStyle } onClick={props.onGoToSearch}>
          <Icon name='search' />
          <Text>{resultsCount}</Text>
        </Button>
        <Text>
          @{(filter.skip || 0) + 1}
        </Text>
        <Button small rounded style={ styles.buttonStyle } onClick={props.onGoToWorkTree}>
          <Text>{props.treedataLen || 0}</Text>
          <Icon type="MaterialCommunityIcons" name='import' />
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
      filter: {skip: 0, limit: PAGE_LIMIT},
      treedata: [],
    };

    this.scrollRef = React.createRef();

    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onAddListPage = this.onAddListPage.bind(this);
    this.onPreviousPage = this.onPreviousPage.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onGoToSearch = this.onGoToSearch.bind(this);
    this.onGoToWorkTree = this.onGoToWorkTree.bind(this);
    this.onGoToSearchList = this.onGoToSearchList.bind(this);
  }

  onContentSizeChange() {
    this.setState(Dimensions.get('window'));
  }

  onSelect(item) {
    let treedata = this.state.treedata;
    treedata.push(item);
    this.setState({ treedata });
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
    if (isChanged) {
      this.setState({ pclassWhere, pfunctionWhere, pclassiWhere });
    }
    this.onGoToSearchList();
  }

  onAddListPage() {
    let filter = this.state.filter;
    filter.skip += PAGE_LIMIT;
    this.setState({ filter });
  }

  onPreviousPage() {
    let filter = this.state.filter;
    filter.skip -= PAGE_LIMIT;
    this.setState({ filter });
  }

  onGoToSearchList() {
    this.scrollRef.current.scrollTo({x: MIN_WIDTH - 100, y: 0, animated: true});
  }

  onGoToSearch() {
    this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  }

  onGoToWorkTree() {
    this.scrollRef.current.scrollToEnd();
  }

  render() {
    const { width, height, treedata } = this.state;
    const pageStyles = getPageSize(3, { width, height });

    const { pclassWhere, pfunctionWhere, pclassiWhere, filter } = this.state;
    const whereFilters = { pclassWhere, pfunctionWhere, pclassiWhere };

    return (
      <ScrollView
        ref={this.scrollRef}
        horizontal={true}
        pagingEnabled={true}
        scrollEnabled={true}
        scrollEventThrottle={100}
        nestedScrollEnabled={true}
        contentContainerStyle={{width: "100%"}}
        onContentSizeChange={this.onContentSizeChange}
      >

        <SearchComponent styles={pageStyles} onQueryChange={this.onQueryChange} />

        <SearchList
          whereFilters={whereFilters}
          filter={filter}
          styles={pageStyles}
          treedataLen={treedata.length}
          onAddListPage={this.onAddListPage}
          onPreviousPage={this.onPreviousPage}
          onSelect={this.onSelect}
          onGoToSearch={this.onGoToSearch}
          onGoToWorkTree={this.onGoToWorkTree}
        />

        <WorkTree
          treedata={treedata}
          styles={pageStyles}
          onGoToSearchList={this.onGoToSearchList}
        />

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
