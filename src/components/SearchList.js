import React from 'react';
import { StyleSheet } from 'react-native';
import {
  View,
  Icon,
  Button,
  Text,
} from 'native-base';
import PclassList from './PclassList.js';
import { useSearchResults, useSearchCount } from '../fetchers.js';


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

  return (
    <View style={{ ...props.styles, flex: 1 }}>
      <PclassList
        data={data}
        onSelect={props.onSelect}
        onAddListPage={() => (resultsCount >= (filter.skip + filter.limit)) ? props.onAddListPage() : () => {}}
        onPreviousPage={() => (filter.skip > 0) ? props.onPreviousPage() : () => {}}
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
        <Button small rounded style={ styles.buttonStyle } onClick={props.onGoToWorkspace}>
          <Text>{props.treedataLen || 0}</Text>
          <Icon type="MaterialCommunityIcons" name='import' />
        </Button>
      </View>

    </View>
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
        <Button small rounded style={ styles.buttonStyle } onClick={props.onGoToWorkspace}>
          <Text>{props.treedataLen || 0}</Text>
          <Icon type="MaterialCommunityIcons" name='import' />
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    buttonStyle: {
      backgroundColor: '#cccccc',
    },
  },
)
