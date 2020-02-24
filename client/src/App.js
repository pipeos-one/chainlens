import React, { Component } from 'react';
import './App.css';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';
import SearchComponent from './components/Search.js';
import Workspace from './components/Workspace.js';
import { SearchListPClasses, SearchListPfunctions, SearchListPClassesByPclassi} from './components/SearchList.js';
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

    this.DEFAULT_FILTER = {skip: 0, limit: PAGE_LIMIT};
    this.PAGE_NUMBER = 3;

    this.state = {
      ...this.getWindowDimensions(),
      pclassWhere: {},
      pfunctionWhere: {},
      pclassiWhere: {},
      filter: Object.assign({}, this.DEFAULT_FILTER),
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
    this.onInfoClosed = this.onInfoClosed.bind(this);
    this.onPfunctionRun = this.onPfunctionRun.bind(this);
    this.onWorkspaceRemoveItem = this.onWorkspaceRemoveItem.bind(this);
  }

  getWindowDimensions() {
    let dims = Dimensions.get('window');
    if (dims.width === 0 || dims.height === 0) {
      dims = document.getElementById('ChainLensRoot')
        .getBoundingClientRect();
    }
    return dims;
  }

  onContentSizeChange() {
    this.setState(this.getWindowDimensions());
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
    let pclassWhere = {}, pfunctionWhere = {}, pclassiWhere = {};

    if (genQuery.valid) {
      ({ pclassWhere, pfunctionWhere, pclassiWhere } = buildWhereQueries(genQuery));
    }

    if (fxQuery.valid) {
      pfunctionWhere = { ...pfunctionWhere, ...buildWhereFx(fxQuery) };
    }
    console.log('pclassiWhere', JSON.stringify(pclassiWhere));
    console.log('pclassWhere', JSON.stringify(pclassWhere));
    console.log('pfunctionWhere', JSON.stringify(pfunctionWhere));
    const isChanged = (
      JSON.stringify(pclassWhere) !== JSON.stringify(this.state.pclassWhere)
      || JSON.stringify(pfunctionWhere) !== JSON.stringify(this.state.pfunctionWhere)
      || JSON.stringify(pclassiWhere) !== JSON.stringify(this.state.pclassiWhere)
    );
    console.log('isChanged', isChanged);
    if (isChanged) {
      const filter = Object.assign({}, this.DEFAULT_FILTER);
      this.setState({ pclassWhere, pfunctionWhere, pclassiWhere, filter });
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
    const {width, height} = this.state;
    const sizes = getPageSize(this.PAGE_NUMBER, { width, height });
    this.scrollRef.current.scrollTo({x: sizes.minWidth, y: 0, animated: true});
  }

  onGoToSearch() {
    this.scrollRef.current.scrollTo({x: 0, y: 0, animated: true});
  }

  onGoToWorkspace() {
    this.scrollRef.current.scrollToEnd();
  }

  onInfo(item) {
    this.setState({ showPclassInfo: item, runPfunction: null });
    this.onGoToWorkspace();
  }

  onInfoClosed() {
    this.setState({ showPclassInfo: null, runPfunction: null });
    this.onGoToSearchList();
  }

  onPfunctionRun(item) {
    this.setState({ runPfunction: item, showPclassInfo: null });
    this.onGoToWorkspace();
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
    const pageStyles = getPageSize(this.PAGE_NUMBER, { width, height });
    const whereFilters = { pclassWhere, pfunctionWhere, pclassiWhere };
    const wherekey = Object.keys(pfunctionWhere)[0] || '';
    const showFunctions = wherekey.includes('data.gapi') || wherekey.includes('data.signature');

    const showByPclassi = (Object.keys(pclassiWhere)[0] || '').includes('address');

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
          : (showByPclassi
            ? <SearchListPClassesByPclassi
                whereFilters={whereFilters}
                whereFilter={pclassiWhere}
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
          )
        }
        {showPclassInfo
          ? <PclassDetails
              styles={pageStyles}
              pclass={showPclassInfo}
              onInfoClosed={this.onInfoClosed}
            />
          : (
            runPfunction
            ? <PfunctionGapi
                key={runPfunction.pfunction._id}
                styles={pageStyles}
                item={runPfunction}
                onInfoClosed={this.onInfoClosed}
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
