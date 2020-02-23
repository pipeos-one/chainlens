import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Icon,
  Button,
  Text,
} from 'native-base';
import PclassList from './PclassList.js';
import { useSearchResults, useSearchCount } from '../utils/fetchers.js';

export function SearchListCommon(props) {
  return (
    <View style={{ ...props.styles, flex: 1 }}>
      <PclassList
        data={props.data}
        buttons={props.buttons}
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
          <Text>{props.resultsCount}</Text>
        </Button>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Button small rounded style={ styles.buttonStyle } onClick={props.onPreviousPage}>
            <Icon type="FontAwesome" name='caret-left' />
          </Button>
          <Text>
            @{(props.filter.skip || 0) + 1}
          </Text>
          <Button small rounded style={ styles.buttonStyle } onClick={props.onAddListPage}>
            <Icon type="FontAwesome" name='caret-right' />
          </Button>
        </View>
        <Button small rounded style={ styles.buttonStyle } onClick={props.onGoToWorkspace}>
          <Text>{props.treedataLen || 0}</Text>
          <Icon type="MaterialCommunityIcons" name='import' />
        </Button>
      </View>

    </View>
  )
}

export function SearchListPClasses(props) {
  const { whereFilter, filter } = props;

  filter.where = whereFilter;

  console.log('!!!!!!!! SearchListPClasses !!!!!!!')

  const { data, error } = useSearchResults(filter, 'pclass');
  const { data: count } = useSearchCount(filter, 'pclass');
  const resultsCount = count ? count.count : 0;

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('data', data)
  console.log('count', resultsCount);

  const buttons = {
    header: [
      {
        callback: props.onInfo,
        icon: {
          type: 'FontAwesome',
          name: 'info',
        }
      },
      {
        callback: props.onSelect,
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'import',
        }
      }
    ],
    contentItem: [
      {
        callback: props.onPfunctionRun,
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'play',
        }
      }
    ]
  }

  return (
    <SearchListCommon
      data={data}
      resultsCount={resultsCount}
      filter={filter}
      styles={props.styles}
      buttons={buttons}
      onGoToSearch={props.onGoToSearch}
      onPreviousPage={props.onPreviousPage}
      onAddListPage={props.onAddListPage}
      onGoToWorkspace={props.onGoToWorkspace}
      treedataLen={props.treedataLen}
    />
  )
}

export function SearchListPClassesByPclassi(props) {
  const { whereFilter, filter } = props;

  filter.where = whereFilter;

  console.log('!!!!!!!! SearchListPClassesByPclassi !!!!!!!', JSON.stringify(filter));

  const { data: pclassiData, error } = useSearchResults(filter, 'pclassi');
  const { data: count } = useSearchCount(filter, 'pclassi');
  const resultsCount = count ? count.count : 0;

  if (error) return <div>failed to load</div>
  if (!pclassiData) return <div>loading...</div>

  const data = pclassiData.map(pclassi => {
    const pclass = pclassi.pclass;
    pclass.pclassInstances = [pclassi];
    return pclass;
  });

  console.log('data', data)
  console.log('count', resultsCount);

  const buttons = {
    header: [
      {
        callback: props.onInfo,
        icon: {
          type: 'FontAwesome',
          name: 'info',
        }
      },
      {
        callback: props.onSelect,
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'import',
        }
      }
    ],
    contentItem: [
      {
        callback: props.onPfunctionRun,
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'play',
        }
      }
    ]
  }

  return (
    <SearchListCommon
      data={data}
      resultsCount={resultsCount}
      filter={filter}
      styles={props.styles}
      buttons={buttons}
      onGoToSearch={props.onGoToSearch}
      onPreviousPage={props.onPreviousPage}
      onAddListPage={props.onAddListPage}
      onGoToWorkspace={props.onGoToWorkspace}
      treedataLen={props.treedataLen}
    />
  )
}

export function SearchListPfunctions(props) {
  const { whereFilter, filter } = props;
  filter.where = whereFilter;
  filter.limit = 300;


  console.log('!!!!!!!! SearchListPfunctions !!!!!!!')

  const { data: pfuncData, error } = useSearchResults(filter, 'pfunction');
  const { data: count } = useSearchCount(filter, 'pfunction');
  const resultsCount = count ? count.count : 0;

  let indexes = {};
  let data = [];
  (pfuncData || []).forEach(pfunc => {
    const pclass = pfunc.pclass;
    console.log('pclass._id', pclass._id, indexes[pclass._id]);
    if (!indexes[pclass._id] && indexes[pclass._id] !== 0) {
      pclass.pfunctions = [pfunc];
      indexes[pclass._id] = data.length;
      data.push(pclass);
    } else {
      data[indexes[pclass._id]].pfunctions.push(pfunc);
    }
    });

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  console.log('data', data)
  console.log('count', resultsCount);

  const buttons = {
    header: [
      {
        callback: props.onInfo,
        icon: {
          type: 'FontAwesome',
          name: 'info',
        }
      },
      {
        callback: props.onSelect,
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'import',
        }
      }
    ],
    contentItem: [
      {
        callback: props.onPfunctionRun,
        icon: {
          type: 'MaterialCommunityIcons',
          name: 'play',
        }
      }
    ]
  }

  return (
    <SearchListCommon
      data={data}
      resultsCount={resultsCount}
      filter={filter}
      styles={props.styles}
      buttons={buttons}
      onGoToSearch={props.onGoToSearch}
      onPreviousPage={props.onPreviousPage}
      onAddListPage={props.onAddListPage}
      onGoToWorkspace={props.onGoToWorkspace}
      treedataLen={props.treedataLen}
    />
  )
}

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
  },
)
