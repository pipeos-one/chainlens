import React, { Component } from 'react';
import './App.css';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';
import SearchComponent from './components/Search.js';
import Workspace from './components/Workspace.js';
import { SearchListPClasses, SearchListPfunctions} from './components/SearchList.js';
import { PclassDetails } from './components/PclassDetails.js';
import { PfunctionGapi } from './components/gapi/PfunctionGapi.js';
import { buildWhereQueries, buildWhereFx } from './utils/queries.js';

const MIN_WIDTH = 800;
const PAGE_LIMIT = 30;


function getPageSize(noOfPages, {width, height}) {
  console.log('--dimensions', noOfPages, {width, height});
  if (width < MIN_WIDTH) return {minWidth: width, minHeight: height};

  // const paddingRight = 3;
  // width -= paddingLeft * noOfPages;
  return {minWidth: width / noOfPages, minHeight: height};
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
      showPclassInfo: null,
      runPfunction: null,
    };

    this.scrollRef = React.createRef();

    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onQueryChange = this.onQueryChange.bind(this);
    this.onAddListPage = this.onAddListPage.bind(this);
    this.onPreviousPage = this.onPreviousPage.bind(this);
    this.onWorkspaceAddItem = this.onWorkspaceAddItem.bind(this);
    this.onGoToSearch = this.onGoToSearch.bind(this);
    this.onGoToWorkspace = this.onGoToWorkspace.bind(this);
    this.onGoToSearchList = this.onGoToSearchList.bind(this);
    this.onInfo = this.onInfo.bind(this);
    this.onPfunctionRun = this.onPfunctionRun.bind(this);
    this.onWorkspaceRemoveItem = this.onWorkspaceRemoveItem.bind(this);
  }

  onContentSizeChange() {
    this.setState(Dimensions.get('window'));
  }

  onWorkspaceAddItem(item) {
    let treedata = this.state.treedata;
    treedata.push(item);
    this.setState({ treedata });
  }

  onWorkspaceRemoveItem(item) {
    let treedata = this.state.treedata;
    let index = treedata.findIndex(pclass => pclass._id === item._id);
    treedata.splice(index, 1);
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
    console.log('pclassWhere', pclassWhere);
    console.log('pfunctionWhere', pfunctionWhere);
    const isChanged = (
      JSON.stringify(pclassWhere) !== JSON.stringify(this.state.pclassWhere)
      || JSON.stringify(pfunctionWhere) !== JSON.stringify(this.state.pfunctionWhere)
      || JSON.stringify(pclassiWhere) !== JSON.stringify(this.state.pclassiWhere)
    );
    console.log('isChanged', isChanged);
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

  onGoToWorkspace() {
    this.scrollRef.current.scrollToEnd();
  }

  onInfo(item) {
    this.setState({ showPclassInfo: item, runPfunction: null });
  }

  onPfunctionRun(item) {
    this.setState({ runPfunction: item, showPclassInfo: null });
  }

  render() {
    const {
      width,
      height,
      treedata,
      showPclassInfo,
      runPfunction,
      pclassWhere,
      pfunctionWhere,
      pclassiWhere,
      filter,
    } = this.state;
    const pageStyles = getPageSize(3, { width, height });
    const whereFilters = { pclassWhere, pfunctionWhere, pclassiWhere };

    const wherekey = Object.keys(pfunctionWhere)[0] || '';
    const showFunctions = wherekey.includes('data.gapi') || wherekey.includes('data.signature');

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

        {showFunctions
          ? <SearchListPfunctions
            whereFilters={whereFilters}
            whereFilter={pfunctionWhere}
            filter={filter}
            styles={pageStyles}
            treedataLen={treedata.length}
            onAddListPage={this.onAddListPage}
            onPreviousPage={this.onPreviousPage}
            onSelect={this.onWorkspaceAddItem}
            onGoToSearch={this.onGoToSearch}
            onGoToWorkspace={this.onGoToWorkspace}
            onInfo={this.onInfo}
            onPfunctionRun={this.onPfunctionRun}
          />
          : <SearchListPClasses
            whereFilters={whereFilters}
            whereFilter={pclassWhere}
            filter={filter}
            styles={pageStyles}
            treedataLen={treedata.length}
            onAddListPage={this.onAddListPage}
            onPreviousPage={this.onPreviousPage}
            onSelect={this.onWorkspaceAddItem}
            onGoToSearch={this.onGoToSearch}
            onGoToWorkspace={this.onGoToWorkspace}
            onInfo={this.onInfo}
            onPfunctionRun={this.onPfunctionRun}
          />
        }
        {showPclassInfo
          ? <PclassDetails
              styles={pageStyles}
              pclass={showPclassInfo}
              onInfoClosed={() => this.setState({ showPclassInfo: null })}
            />
          : (
            runPfunction
            ? <PfunctionGapi
                key={runPfunction.pfunction._id}
                styles={pageStyles}
                item={runPfunction}
                onInfoClosed={() => this.setState({ runPfunction: null })}
              />
            : <Workspace
              treedata={treedata}
              styles={pageStyles}
              onGoToSearchList={this.onGoToSearchList}
              onRemove={this.onWorkspaceRemoveItem}
            />
          )
        }
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
