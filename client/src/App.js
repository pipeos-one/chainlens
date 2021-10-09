import React, { Component } from 'react';
import './App.css';
import { Dimensions, StyleSheet, ScrollView } from 'react-native';
import { Container } from 'native-base';
import SearchComponent from './components/Search.js';
import Workspace from './components/Workspace.js';
import { SearchListPClasses, SearchListPfunctions, SearchListPClassesByPclassi, SearchListdTypes, SearchListdTypeValues} from './components/SearchList.js';
import { PclassDetails } from './components/PclassDetails.js';
import { PfunctionGapi } from './components/gapi/PfunctionGapi.js';
import { buildWhereQueries, buildWhereFx } from './utils/queries.js';
import { getWeb3, CHAIN_NAMES } from './utils/web3.js';
import { insertType, insertTypeValue, pclassWithPfuncApi, pclassCount } from './utils/fetchers.js';
import { mutate as fetchMutate } from "swr";
import * as dtypeutils from './utils/dtype.js';

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
      dtypeWhere: {},
      dtypeiWhere: {},
      filter: Object.assign({}, this.DEFAULT_FILTER),
      treedata: [],
      showPclassInfo: null,
      runPfunction: null,
      chainid: null,
      currentNamedType: null,
      currentTypeValue: null,
      dtypeAdd: null,
      dtypeiShow: null,
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
    this.onAddType = this.onAddType.bind(this);
    this.onRundType = this.onRundType.bind(this);
    this.onAfterRunType = this.onAfterRunType.bind(this);
    this.onAddValue = this.onAddValue.bind(this);
    this.onAddValueRun = this.onAddValueRun.bind(this);
    this.onAfterRunValue = this.onAfterRunValue.bind(this);
    this.onShowValues = this.onShowValues.bind(this);

    Dimensions.addEventListener('change', () => {
      this.onContentSizeChange();
    });

    this.setWeb3();
  }

  async setWeb3() {
    this.web3 = await getWeb3();
    const network = await this.web3.provider.getNetwork();
    this.setState({ chainid: parseInt(network.chainId)});
  }

  getWindowDimensions() {
    let wdims = Dimensions.get('window');
    let rootDims = document.getElementById('ChainLensRoot').getBoundingClientRect();

    const dims = {
      width: wdims.width || rootDims.width,
      height: wdims.height || rootDims.height,
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

  onQueryChange({ genQuery, fxQuery, dtQuery }) {
    let pclassWhere = {}, pfunctionWhere = {}, pclassiWhere = {}, dtypeWhere = {};

    if (genQuery.valid) {
      ({ pclassWhere, pfunctionWhere, pclassiWhere } = buildWhereQueries(genQuery));
    }

    if (dtQuery.valid) {
      ({ dtypeWhere } = buildWhereQueries(dtQuery));
    }

    if (fxQuery.valid) {
      pfunctionWhere = { ...pfunctionWhere, ...buildWhereFx(fxQuery) };
    }

    console.log('pclassiWhere', JSON.stringify(pclassiWhere));
    console.log('pclassWhere', JSON.stringify(pclassWhere));
    console.log('pfunctionWhere', JSON.stringify(pfunctionWhere));
    console.log('dtypeWhere', JSON.stringify(dtypeWhere));
    const isChanged = (
      JSON.stringify(pclassWhere) !== JSON.stringify(this.state.pclassWhere)
      || JSON.stringify(pfunctionWhere) !== JSON.stringify(this.state.pfunctionWhere)
      || JSON.stringify(pclassiWhere) !== JSON.stringify(this.state.pclassiWhere)
      || JSON.stringify(dtypeWhere) !== JSON.stringify(this.state.dtypeWhere)
    );
    console.log('isChanged', isChanged);
    if (isChanged) {
      const filter = Object.assign({}, this.DEFAULT_FILTER);
      this.setState({ pclassWhere, pfunctionWhere, pclassiWhere, dtypeWhere, filter });
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
    this.setState({ showPclassInfo: item, runPfunction: null, dtypeiShow: null });
    this.onGoToWorkspace();
  }

  onInfoClosed() {
    this.setState({ showPclassInfo: null, runPfunction: null, dtypeiShow: null });
    this.onGoToSearchList();
  }

  onPfunctionRun(item) {
    this.setState({ runPfunction: item, showPclassInfo: null, dtypeiShow: null });
    this.onGoToWorkspace();
  }

  onAddType(item) {
    console.log('onAddType', item)
    const pfunction = {
      _id: item._id,
      data: {
        name: item.data.name,
        signature: item.data.identifier,
        gapi: {
          name: item.data.name,
          inputs: item.data.inputArgs.concat({name: 'name', type: 'string'}),
          outputs: [],
          stateMutability: 'nonpayable',
        }
      },
    };
    const pclass = {
      data: {
        name: 'dTypeInterpreter',
        gapi: [],
      },
      pclassInstances: [
        {
          data: {
            deployment: {
              chainid: 3,
              address: '0x4FDC110B666f4f1AECb12df272C964b34B28Db05',
            }
          }
        }
      ]
    };
    const typeitem = { pfunction, pclass }
    console.log('onAddType pfunc', typeitem);
    this.setState({ dtypeAdd: 1 });
    this.onPfunctionRun(typeitem)
  }

  async onRundType(ethers, provider, signer, address, pfunction, inputs) {
    console.log('onRundType', address, pfunction, inputs);

    let name = inputs[pfunction.data.gapi.inputs.findIndex(inp => inp.name === 'name')]
    let size = inputs[pfunction.data.gapi.inputs.findIndex(inp => inp.name === 'size')]
    console.log('size', size);
    let namehash = ethers.utils.id(name).slice(2, 10)
    let abstractTypeId = pfunction.data.signature;
    if (parseInt(abstractTypeId.slice(2)) === 0) {
      abstractTypeId = abstractTypeId.slice(0, 2) + dtypeutils.uencode(parseInt(size), 6);
    }
    console.log('abstractTypeId', abstractTypeId);
    let innerInput = pfunction.data.gapi.inputs.filter(inp => inp.name !== 'name')
      .map((inp, i) => {
        let size = parseInt(inp.type.substring(2), 16);
        return inp.type + dtypeutils.uencode(parseInt(inputs[i]), size*2);
    });

    let inputData = 'ee'
      + dtypeutils.uencode(pfunction.data.gapi.inputs.length, 6)
      + innerInput.map(inp => dtypeutils.uencode(inp.length / 2, 8)).join('')
      + innerInput.join('')

    let data = '0xfffffffc'
      + namehash
      + 'ee00000200000004'
      + dtypeutils.uencode(inputData.length / 2 + 4, 8)
      + abstractTypeId
      + inputData

    let transaction = {
        to: address,
        value: 0,
        data,
        gasPrice: 21000000000,
    };

    transaction.gasLimit = (await provider.estimateGas(transaction)).toNumber() + 200000;
    console.log('transaction', transaction);

    this.setState({currentNamedType: {
      data: {
        name,
        identifier: namehash,
        abstractIdentifier: abstractTypeId,
        input: data,
        inputArgs: [],
      },
      metadata: {
        chainids: [3]
      },
      timestamp: new Date(),
    }});
    // Send the transaction
    return signer.sendTransaction(transaction);
  }

  async onAfterRunType() {
    const namedType = this.state.currentNamedType;
    const response = await insertType(namedType);
    console.log('saved named type', response);
    const { filter, dtypeWhere } = this.state;
    filter.where = dtypeWhere
    console.log('filter', filter)
    fetchMutate(pclassWithPfuncApi(filter, 'dtype'))
    fetchMutate(pclassCount(filter, 'dtype'))
  }

  async onAddValue(item) {
    console.log('onAddValue', item)
    const pfunction = {
      _id: item._id,
      data: {
        name: item.data.name,
        signature: item.data.identifier,
        gapi: {
          name: item.data.name,
          inputs: [
            {name: 'value', type: item.data.name},
          ],
          outputs: [],
          stateMutability: 'nonpayable',
        }
      },
    };
    const pclass = {
      data: {
        name: 'dTypeInterpreter',
        gapi: [],
      },
      pclassInstances: [
        {
          data: {
            deployment: {
              chainid: 3,
              address: '0x4FDC110B666f4f1AECb12df272C964b34B28Db05',
            }
          }
        }
      ]
    };
    const typeitem = { pfunction, pclass }
    console.log('onAddType pfunc', typeitem);
    this.setState({ dtypeAdd: 2 });
    this.onPfunctionRun(typeitem)
  }

  async onAddValueRun(ethers, provider, signer, address, pfunction, value) {
    console.log('onAddValueRun item', pfunction, value);
    // 0xffffffff33333326ee0000010000000722000003777777

    let itemData = await dtypeutils.encodeTypeData(pfunction.data.signature, value);
    const data = '0xffffffff33333326ee000001'
      + dtypeutils.uencode(itemData.length / 2, 8)
      + itemData;

    let transaction = {
        to: address,
        value: 0,
        data,
        gasPrice: 21000000000,
    };
    console.log('transaction', transaction);
    transaction.gasLimit = (await provider.estimateGas(transaction)).toNumber() + 200000;
    console.log('transaction', transaction);

    const count = await provider.call({to: address, data: `0xffffffff33333324ee0000010000000811000004` + pfunction.data.signature});
    console.log('count', count, count.slice(26));
    this.setState({currentTypeValue: {
      dtype_id: pfunction._id,
      dtype_identifier: pfunction.data.signature,
      dtype_name: pfunction.data.name,
      value: value.toString(),
      valueHex: itemData,
      index: parseInt('0x' + count.slice(26)),
    }});

    // Send the transaction
    return signer.sendTransaction(transaction);
  }

  async onAfterRunValue() {
    console.log('onAfterRunValue')
    const currentValue = this.state.currentTypeValue;
    const response = await insertTypeValue(currentValue);
    console.log('saved type value', response);
    const { filter, dtypeWhere } = this.state;
    filter.where = dtypeWhere
    console.log('filter', filter)
    fetchMutate(pclassWithPfuncApi(filter, 'dtypei'))
    fetchMutate(pclassCount(filter, 'dtypei'))
  }

  async onShowValues(item) {
    console.log('onShowValues', item);
    const dtypeiWhere = {dtype_id: item._id};
    this.setState({ dtypeiWhere, dtypeiShow: true });
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
      dtypeWhere={},
      dtypeiWhere,
      filter,
      chainid,
      dtypeAdd,
      dtypeiShow,
    } = this.state;
    const pageStyles = getPageSize(this.PAGE_NUMBER, { width, height });
    const whereFilters = { pclassWhere, pfunctionWhere, pclassiWhere, dtypeWhere, dtypeiWhere };
    const wherekey = Object.keys(pfunctionWhere)[0] || '';
    const showFunctions = wherekey.includes('data.gapi') || wherekey.includes('data.signature');

    const showByPclassi = (Object.keys(pclassiWhere)[0] || '').includes('address');

    const showdTypes = Object.keys(dtypeWhere || {}).length > 0;
    // const showdTypes = true;

    if (chainid) {
      pclassWhere["metadata.chainids"] = {"inq":[chainid]};
      pfunctionWhere["metadata.chainids"] = {"inq":[chainid]};
      pclassiWhere["data.deployment.chainid"] = chainid;
      dtypeWhere["metadata.chainids"] = {"inq":[chainid]};
    }

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

        <SearchComponent
          styles={pageStyles}
          chain={{ id: chainid, name: CHAIN_NAMES[chainid] }}
          onQueryChange={this.onQueryChange}
        />

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
            : (showdTypes
              ? <SearchListdTypes
                whereFilters={whereFilters}
                whereFilter={dtypeWhere}
                filter={filter}
                styles={pageStyles}
                treedataLen={treedata.length}
                onAddListPage={this.onAddListPage}
                onPreviousPage={this.onPreviousPage}
                onSelect={this.onWorkspaceAddItem}
                onGoToSearch={this.onGoToSearch}
                onGoToWorkspace={this.onGoToWorkspace}
                onInfo={this.onInfo}
                onAddType={this.onAddType}
                onAddValue={this.onAddValue}
                onShowValues={this.onShowValues}
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
                onRun={showdTypes
                  ? (dtypeAdd === 1 ? this.onRundType : this.onAddValueRun)
                  : null
                }
                onAfterRun={showdTypes
                  ? (dtypeAdd === 1 ? this.onAfterRunType : this.onAfterRunValue)
                  : null
                }
              />
            : (dtypeiShow
              ? <SearchListdTypeValues
                whereFilters={whereFilters}
                whereFilter={dtypeiWhere}
                filter={filter}
                styles={pageStyles}
                treedataLen={treedata.length}
                onAddListPage={this.onAddListPage}
                onPreviousPage={this.onPreviousPage}
                onSelect={this.onWorkspaceAddItem}
                onGoToSearch={this.onInfoClosed}
                onGoToWorkspace={this.onGoToWorkspace}
              />
              : <Workspace
                treedata={treedata}
                styles={pageStyles}
                onGoToSearchList={this.onGoToSearchList}
                onRemove={this.onWorkspaceRemoveItem}
              />
            )
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
